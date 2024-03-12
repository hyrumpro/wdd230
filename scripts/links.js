
const baseURL = "https://hyrumpro.github.io/wdd230/data/";


const linksURL = baseURL + "links.json";
console.log(linksURL)

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        displayLinks(data.lessons);
    } catch (error) {
        console.error("Error fetching links:", error);
    }
}


// Updated displayLinks function
function displayLinks(lessons) { // Rename parameter for clarity
    const linksContainer = document.querySelector(".subcard");
    linksContainer.innerHTML = "";

    lessons.forEach((lesson) => { // Iterate lessons
        const weekHeading = document.createElement("h3");
        weekHeading.textContent = "Week " + lesson.lesson + ":";
        linksContainer.appendChild(weekHeading);
        lesson.links.forEach((link) => {
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
