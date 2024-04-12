const API_KEY = '88676267acbf625addc2fd78c7960a55';
const CITY = 'Trujillo,pe';
const bannerEl = document.getElementById('banner');
const closeButton = document.getElementById('close-banner');
const currentTempEl = document.getElementById('current-temp');
const currentDescEl = document.getElementById('current-description');
const forecastEl = document.getElementById('forecast');
const weatherCard = document.getElementById('weather-card');
const jumbotronElement = document.getElementById('jumbotron-weather');

const weatherColorMap = {
    'Clear': '#cfe2f3',
    'Clouds': '#e4e5e7',
    'Rain': '#99ccff',
    'Fog': '#d6d6d6',
    'Thunderstorm': '#666',
    'Mist': '#d6d6d6',
    'Snow': '#f0f0f0',
    'default': '#f2f2f2'
};


async function fetchCurrentWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data)
    return data;
}


async function fetchForecastData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data)
    return data;
}


function displayCurrentWeather(data) {
    const currentTemp = Math.round(data.main.temp);
    const currentDesc = data.weather[0].description;

    const weatherCondition = data.weather[0].main;
    const bgColor = weatherColorMap[weatherCondition] || weatherColorMap['default'];
    if (jumbotronElement) {
        jumbotronElement.style.backgroundColor = bgColor;
    }

    let weatherIcon;
    switch (weatherCondition) {
        case 'Clear':
            weatherIcon = './images/sunny.png';
            break;
        case 'Clouds':
            weatherIcon = './images/cloudy.png';
            break;
        case 'Rain':
            weatherIcon = './images/rainy.png';
            break;
        case 'Fog':
            weatherIcon = './images/fog.png';
            break;
        case 'Thunderstorm':
            weatherIcon = '../images/stormy.png';
            break;
        case 'Mist':
            weatherIcon = './images/stormy.png';
            break;
        case 'Snow':
            weatherIcon = './images/snow.png';
            break;
        default:
            weatherIcon = './images/unknown.png';
    }

    if (weatherCard) {
        weatherCard.innerHTML = `
            <img src="${weatherIcon}" alt="${weatherCondition}">
            <p>${currentTemp}°C</p>
            <p>${currentDesc}</p>
        `;
    }
}

function displayForecast(data) {
    const forecastData = data.list.filter((item, index) => index % 8 === 0);
    forecastEl.innerHTML = forecastData.map((day) => `
    <div>
      <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
      <p>${Math.round(day.main.temp)}°C</p>
    </div>
  `).join('');
}

function toggleBanner() {
    const currentDay = new Date().getDay();
    if (currentDay >= 1 && currentDay <= 3) {
        bannerEl.style.display = 'block';
    } else {
        bannerEl.style.display = 'none';
    }
}


closeButton.addEventListener('click', () => {
    bannerEl.style.display = 'none';
});


Promise.all([fetchCurrentWeatherData(), fetchForecastData()])
    .then(([currentWeatherData, forecastData]) => {
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
        toggleBanner();
    })
    .catch((error) => {
        console.log('Error fetching weather data:', error);
    });



function getRandomCompanies(companies, count) {
    const shuffledCompanies = companies.sort(() => 0.5 - Math.random());
    return shuffledCompanies.slice(0, count);
}




fetch('data/members.json')
    .then(response => response.json())
    .then(data => {
        const silverOrGoldCompanies = data.filter(company => company.membershipLevel === 'Silver' || company.membershipLevel === 'Gold');
        const randomCompanies = getRandomCompanies(silverOrGoldCompanies, 3);
        console.log("dat company:", data)
        displayCompanies(randomCompanies);
    })
    .catch(error => console.error('Error fetching company data:', error));

function displayCompanies(companies) {
    const spotlightContainer = document.getElementById('spotlight-list');
    spotlightContainer.innerHTML = '';

    companies.forEach(company => {
        const companyItem = document.createElement('li');
        companyItem.innerHTML = `
            <h3>${company.name}</h3>
            <p>${company.membershipLevel} Member</p>
            <img src="${company.image}" alt="${company.name}">
            <p>Address: ${company.address}</p>
            <p>Phone: ${company.phone}</p>
            <p>Website: ${company.website}</p>
            <p>Description: ${company.description}</p>
        `;
        spotlightContainer.appendChild(companyItem);
    });
}


