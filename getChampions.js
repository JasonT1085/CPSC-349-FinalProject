fetch('https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json')
.then(response => response.json())
.then(data => {
    let championGrid = document.querySelector('.champion-grid');

    const champions = Object.keys(data.data).map(champion => (
        {
        id: data.data[champion].id,
        name: data.data[champion].name,
        icon: `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${data.data[champion].image.full}`,
        image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.data[champion].id}_0.jpg`
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
        championTile.setAttribute('data-champion-id', champion.id.toLowerCase());
        championGrid.appendChild(championTile);
      });


      fetch('json/championStats.json')
      .then(response => response.json())
      .then(data => {
          let championStats = Object.keys(data.data).map(champion => (
            {
              id: data.data[champion].id,
              dmgDealt: data.data[champion].stats.dmgDealt,
              dmgTaken: data.data[champion].stats.dmgTaken,
              winRate: data.data[champion].stats.winRate,
            }
          ));
          let infoContainer = document.querySelector('.info-container');
          championStats.forEach(championStats => {

            const champion = champions.find(champion => champion.id.toLowerCase() === championStats.id.toLowerCase());
            const championStatsContainer = document.createElement('div');
            championStatsContainer.classList.add('champion-stats-container');
            championStatsContainer.setAttribute('data-champion-id', championStats.id);

            const championStatsInfo = document.createElement('div');
            championStatsInfo.classList.add('champion-stats');
            championStatsInfo.innerHTML = `
              <img src="${champion.image}" alt="${champion.name}'s splash image">
            `;
  
            const championStatsList = document.createElement('ul');
            championStatsList.classList.add('champion-stats-list');
            championStatsList.innerHTML = `
              <li>Damage Dealt: ${championStats.dmgDealt}</li>
              <li>Damage Taken: ${championStats.dmgTaken}</li>
              <li>Win Rate: ${championStats.winRate}</li>
            `;
            championStatsInfo.appendChild(championStatsList);
            championStatsInfo.classList.add('hidden');
  
            championStatsContainer.appendChild(championStatsInfo);

            infoContainer.appendChild(championStatsContainer);
          });

      });
    })
    .catch(error => console.error(error));