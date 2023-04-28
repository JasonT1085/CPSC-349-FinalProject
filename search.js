const searchInput = document.getElementById('search-bar');
const championGrid = document.querySelector('.champion-grid');
let numColumns = 7;
let searchTerm = '';

function updateGrid() {
  const championTiles = document.querySelectorAll('.champion-tile');
  const tilesToShow = [];

  championTiles.forEach(championTile => {
    const championName = championTile.getAttribute('data-champion-name');

    if (championName.includes(searchTerm)) {
      tilesToShow.push(championTile);
    } else {
      championTile.classList.add('hidden');
    }
  });

  tilesToShow.forEach((championTile, index) => {
    championTile.classList.remove('hidden');
    const row = Math.floor(index / numColumns);
    const col = index % numColumns;
    championTile.style.gridRow = row + 1;
    championTile.style.gridColumn = col + 1;
  });

  championGrid.style.gridTemplateRows = `repeat(${Math.ceil(tilesToShow.length / numColumns)}, 1fr)`;
}

function updateColumns() {
  switch(window.innerWidth) {
    case 320:
      numColumns = 2;
      break;
    case 375:
      numColumns = 3;
      break;
    case 414:
      numColumns = 4;
      break;
    case 768:
      numColumns = 5;
      break;
    case 1280:
      numColumns = 6;
      break;
  }

  updateGrid();
}


searchInput.addEventListener('input', function() {
  searchTerm = this.value.trim().toLowerCase();
  updateGrid();
});

updateColumns();
window.addEventListener('resize', updateColumns);