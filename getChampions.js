fetch('https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json')
.then(response => response.json())
.then(data => {
    let championGrid = document.querySelector('.champion-grid');

    const champions = Object.keys(data.data).map(champion => (
        {
        name: data.data[champion].name,
        icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${data.data[champion].image.full}`
        }
    ));

    champions.sort((a, b) => a.name.localeCompare(b.name));

    champions.forEach(champion => {
        const championTile = document.createElement('div');
        championTile.classList.add('champion-tile');
        championTile.innerHTML = `
          <img src="${champion.icon}" alt="${champion.name}">
          <h3>${champion.name}</h3>
        `;
        championTile.setAttribute('data-champion-name', champion.name.toLowerCase());
        championGrid.appendChild(championTile);
      });
    })
    .catch(error => console.error(error));