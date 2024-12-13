(function () {
  //------------- Floors

  function createGroundFloor() {
    const window = document.createElement('div');
    window.classList.add('window');

    const groundfloor = document.createElement('div');
    groundfloor.classList.add('groundFloor');
    groundfloor.setAttribute('floor', 'g');
    groundfloor.appendChild(window);

    return groundfloor;
  }

  function createFloor(number) {
    const door = document.createElement('div');
    door.classList.add('door');

    const floor = document.createElement('div');
    floor.classList.add('floor');
    floor.setAttribute('floor', number);
    floor.appendChild(door);

    return floor;
  }

  function createFloors() {
    const elementsWithFloors = document.querySelectorAll('[floors]');
    elementsWithFloors.forEach((elWithFloors) => {
      const amount = +elWithFloors.getAttribute('floors');

      for (let i = 0; i < amount; i++) {
        elWithFloors.appendChild(createFloor(i));
      }

      elWithFloors.appendChild(createGroundFloor());
    });
  }

  createFloors();
  // ------------- Elevator

  function initializedCommand(dataFloor) {
    const button = document.querySelector(`[data-floor="${dataFloor}"]`);
    button.classList.add('highlight');
  }

  function finalizedCommand(dataFloor) {
    const button = document.querySelector(`[data-floor="${dataFloor}"]`);
    button.classList.remove('highlight');
  }

  function startMovement() {
    const elevator = document.querySelector('.elevator');
    elevator.setAttribute('in-movement', '');
  }

  function endMovement() {
    const elevator = document.querySelector('.elevator');
    elevator.removeAttribute('in-movement');
  }

  function inMovement() {
    const elevator = document.querySelector('.elevator');
    return elevator.hasAttribute('in-movement');
  }

  function getElevatorSize() {
    const groundFloor = document.querySelector('[floor="g"]');
    return groundFloor.offsetHeight;
  }

  function createElevator() {
    const pit = document.querySelector('.pit');

    const elevator = document.createElement('div');
    elevator.classList.add('elevator');
    elevator.style.height = getElevatorSize();

    pit.appendChild(elevator);
  }

  function getCurrentPosition() {
    const elevator = document.querySelector('.elevator');
    return +elevator.style.bottom.replace('px', '');
  }

  function showDial(text) {
    const dial = document.querySelector('.dial');
    dial.innerHTML = text;
  }

  function moveElevatorTo(floor) {
    if (inMovement()) return;

    startMovement();
    initializedCommand(floor);
    const number = floor === 'G' ? 0 : +floor;
    const elevator = document.querySelector('.elevator');

    const initialPosition = getCurrentPosition();
    const finalPosition = number * getElevatorSize();
    const goingUp = finalPosition > initialPosition;

    showDial(goingUp ? 'Going Up' : 'Going Down');

    let currentPosition = initialPosition;
    let timer = setInterval(() => {
      currentPosition += goingUp ? 10 : -10;
      elevator.style.bottom = `${currentPosition}px`;

      const reachedPosition = goingUp
        ? currentPosition >= finalPosition
        : currentPosition <= finalPosition;

      if (reachedPosition) {
        clearInterval(timer);
        elevator.style.bottom = `${finalPosition}px`; // Certifique-se de definir a posição final correta
        showDial(floor === 'G' ? 'Ground Floor' : `${floor} Floor`);
        endMovement();
        finalizedCommand(floor);
      }
    }, 30);
  }

  function addElevatorControls() {
    const buttons = document.querySelectorAll('[data-floor]');
    buttons.forEach((button) => {
      const floor = button.getAttribute('data-floor');
      button.onclick = function () {
        moveElevatorTo(floor);
      };
    });
  }
  createElevator();
  addElevatorControls();
})();
