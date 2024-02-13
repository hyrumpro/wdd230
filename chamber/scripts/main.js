
const apiKey = '88676267acbf625addc2fd78c7960a55';
const city = 'Trujillo,pe';

// Current weather fetch - Mostly unchanged
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherCard = document.getElementById('weather-card');
        let weatherIcon;
        const weatherColorMap = {
            'Clear': '#cfe2f3',  // Light blue
            'Clouds': '#e4e5e7', // Soft gray
            'Rain': '#99ccff',   // Light blue
            'Fog': '#d6d6d6',    // Light gray
            'Thunderstorm': '#666', // Dark gray
            'Mist': '#d6d6d6',   // Same as fog
            'Snow': '#f0f0f0',   // Off-white
            'default': '#f2f2f2' // Default light gray
        };


        // Determine which weather image to use based on the weather description
        switch(data.weather[0].main) {
            case 'Clear':
                weatherIcon = '../images/sunny.png';
                break;
            case 'Clouds':
                weatherIcon = '../images/cloudy.png';
                break;
            case 'Rain':
                weatherIcon = '../images/rainy.png';
                break;
            case 'Fog':
                weatherIcon = '../images/fog.png';
                break;
            case 'Thunderstorm':
                weatherIcon = '../images/stormy.png';
                break;
            case 'Mist':
                weatherIcon = '../images/stormy.png';
                break;
            case 'Snow':
                weatherIcon = '../images/snow.png';
                break;
            default:
                weatherIcon = '../images/unknown.png';
        }

        const weatherCondition = data.weather[0].main;
        const bgColor = weatherColorMap[weatherCondition] || weatherColorMap['default'];
        const jumbotronElement = document.getElementById('jumbotron-weather');
        if (jumbotronElement) {
            jumbotronElement.style.backgroundColor = bgColor;
        }

        weatherCard.innerHTML = `
            <div class="weather"> 
                <div class="location">
                    <h2>${data.name}</h2>
                </div>
                <div class="current-weather">
                    <h3 class="capitalize-description">${data.weather[0].description} <span> Wind: ${data.wind.speed} km/h</h3>
                        <h1 id="weather-celsius">${Math.round(data.main.temp)}°</h1>
                        <div class="sky"> 
                            <img src="images/${weatherIcon}" alt="Weather Icon">
                    </div> 
                </div>
            </div> 
        `;
    })
    .catch(error => console.error('Error fetching current weather data:', error));




