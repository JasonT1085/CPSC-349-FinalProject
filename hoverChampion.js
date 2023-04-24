const championTiles = document.querySelectorAll('.champion-tile');
championTiles.forEach(championTile => {
  championTile.addEventListener('mouseover', function() {
    const championName = this.getAttribute('data-champion-name');
    this.style.setProperty('--tooltip-content', `"Champion Name: ${championName}"`);
  });
});