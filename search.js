const searchInput = document.getElementById('search-bar');

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  const championTiles = document.querySelectorAll('.champion-tile');

  championTiles.forEach(championTile => {
    const championName = championTile.getAttribute('data-champion-name');

    if (championName.includes(searchTerm)) {
      championTile.classList.remove('hidden');
    } else {
      championTile.classList.add('hidden');
    }
  });
});
