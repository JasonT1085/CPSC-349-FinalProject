const searchInput = document.getElementById('search-bar');
const championGrid = document.querySelector('.champion-grid');

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  const championTiles = document.querySelectorAll('.champion-tile');
  const tilesToShow = [];

  championTiles.forEach(championTile => {
    const championName = championTile.getAttribute('data-champion-name');

    if (championName.startsWith(searchTerm)) {
      tilesToShow.push(championTile);
    } else {
      championTile.classList.add('hidden');
    }
  });

  tilesToShow.forEach((championTile, index) => {
    championTile.classList.remove('hidden');
    const row = Math.floor(index / 7);
    const col = index % 7;
    championTile.style.gridRow = row + 1;
    championTile.style.gridColumn = col + 1;
  });

  championGrid.style.gridTemplateRows = `repeat(${Math.ceil(tilesToShow.length / 7)}, 1fr)`;
});