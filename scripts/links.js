
const baseURL = "https://hyrumpro.github.io/wdd230/data/";


const linksURL = baseURL + "links.json";


async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        displayLinks(data);
    } catch (error) {
        console.error("Error fetching links:", error);
    }
}


function displayLinks(weeks) {
    const linksContainer = document.querySelector(".subcard");
    linksContainer.innerHTML = "";

    weeks.forEach((week) => {
        week.links.forEach((link) => {
            const listItem = document.createElement("li");
            const activityLink = document.createElement("a");
            activityLink.href = baseURL + link.url;
            activityLink.textContent = link.title;
            listItem.appendChild(activityLink);
            linksContainer.appendChild(listItem);
        });
    });
}


getLinks();
