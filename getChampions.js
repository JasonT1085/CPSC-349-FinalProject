fetch('https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json')
  .then(response => response.json())
  .then(data => {
    let championGrid = document.querySelector('.champion-grid');
    let statsData = {}; // store fetched stats data here

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
      championTile.setAttribute('data-champion-id', champion.id);

      championTile.addEventListener('mouseenter', handleChampionTileMouseEnter);
      championTile.addEventListener('mouseleave', handleChampionTileMouseLeave);
      championTile.addEventListener('mousemove', handleChampionTileMouseMove);
      championGrid.appendChild(championTile);
    });

    function handleChampionTileMouseMove(e) {
      const popup = document.querySelector('.champion-stats-container');
      if (popup) {
        const xoffset = 0;
        const yoffset = -popup.offsetHeight - 10;
        const x = e.clientX + xoffset + window.scrollX;
        const y = e.clientY + yoffset + window.scrollY;
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
      }
    }
    let isFetchingStats = false;

    function handleChampionTileMouseEnter(e) {
      const championId = e.currentTarget.getAttribute('data-champion-id');
      if (!statsData[championId] && !isFetchingStats) { // check if stats data has already been fetched and is not currently being fetched
        isFetchingStats = true; // set flag to true
        fetch('json/championStats.json')
          .then(response => response.json())
          .then(data => {
            statsData = data.data; // store fetched stats data in object
            console.log(statsData[championId]);
            isFetchingStats = false; // set flag to false
            displayChampionStatsPopup(e, championId, statsData[championId]);
          })
          .catch(error => console.error(error));
      } else if (!isFetchingStats) { // check if data is not being fetched
        displayChampionStatsPopup(e, championId, statsData[championId]);
      }
    }

    function handleChampionTileMouseLeave(e) {
      const popup = document.querySelector('.champion-stats-container');
      if (popup) {
        const championTile = e.currentTarget;
        if (!championTile.contains(e.relatedTarget)) {
          popup.remove();
        }
      }
    }

    function displayChampionStatsPopup(e,championId, championStats) {

      const championStatsContainer = document.createElement('div');
      championStatsContainer.classList.add('champion-stats-container');
      championStatsContainer.setAttribute('data-champion-id', championId);

      const championStatsInfo = document.createElement('div');
      championStatsInfo.classList.add('champion-stats');


      const championImage = document.createElement('img');
      championImage.src = champions.find(champion => champion.id.toLowerCase() === championId.toLowerCase()).image;
      championImage.alt = `${champions.find(champion => champion.id.toLowerCase() === championId.toLowerCase()).name}'s splash image`;
      championStatsInfo.appendChild(championImage);

      const championText = document.createElement('div');
      championText.classList.add('champion-stats-text');
      championText.textContent = "Your text here"; // replace with the actual text you want to display
      championStatsInfo.appendChild(championText);

      championStatsContainer.appendChild(championStatsInfo);

      document.body.appendChild(championStatsContainer);

    }
  })
  .catch(error => console.error(error));
