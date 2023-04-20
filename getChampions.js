fetch('https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json')
.then(response => response.json())
.then(data => {
    let championGrid = document.querySelector('.champion-grid');
    for (const champion in data.data) {
        const championName = data.data[champion].id;
        const imageURL = `https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${championName}.png`;

        let championTile = document.createElement('div');
        championTile.classList.add('champion-tile');

        let championImage = document.createElement('img');
        championImage.src = imageURL;
        championImage.alt = championName;

        let championNameElement = document.createElement('h3');
        championNameElement.textContent = championName;
        
        championTile.appendChild(championImage);
        championTile.appendChild(championNameElement);
        championGrid.appendChild(championTile);
        

    }
}).catch(error => console.log(error));