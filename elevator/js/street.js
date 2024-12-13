(function () {
  function createTracks() {
    const rangeElements = document.querySelectorAll('[tracks]');
    rangeElements.forEach((el) => {
      const amount = +el.getAttribute('tracks');
      for (let i = 0; i < amount; i++) {
        const tracks = document.createElement('div');
        tracks.classList.add('tracks');
        el.appendChild(tracks);
      }
    });
  }

  createTracks();
})();
