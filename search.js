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
  const width = window.innerWidth;
  if (width < 436) {
    numColumns = 2;
  }
   else if (width < 650) {
    numColumns = 3;
  }
  else if (width < 992) {
    numColumns = 4;
  } 
  else if (width < 1200) {
    numColumns = 6;
  } 
  else if (width > 1200) { 
    numColumns = 7;
  }
  updateGrid();
}


searchInput.addEventListener('input', function() {
  searchTerm = this.value.trim().toLowerCase();
  updateColumns();
  updateGrid();
});

updateColumns();
window.addEventListener('resize', updateColumns);
window.addEventListener('resize', updateGrid);

window.addEventListener('load', updateColumns);
window.addEventListener('load', updateGrid);

