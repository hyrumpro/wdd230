// Constants
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');


async function getProphetData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.table(data.prophets);
        displayProphets(data.prophets);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
//Display

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');

        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Create image and set attributes
        const portrait = document.createElement('img');
        portrait.src = prophet.imageurl;
        portrait.alt = `${prophet.name} ${prophet.lastname}`;
        portrait.loading = 'lazy';
        portrait.width = '200';
        portrait.height = '200';


        card.appendChild(fullName);
        card.appendChild(portrait);


        cards.appendChild(card);
    });
};




getProphetData();

