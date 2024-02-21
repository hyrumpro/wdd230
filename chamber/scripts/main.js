
const apiKey = '88676267acbf625addc2fd78c7960a55';
const city = 'Trujillo,pe';

// Current weather fetch - Mostly unchanged
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherCard = document.getElementById('weather-card');
        let weatherIcon;
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

        const tempCelsius= data.main.temp;
        const windSpeedKmh = data.wind.speed;
        console.log(tempCelsius, windSpeedKmh)

        function calculateWindChill(tempCelsius, windSpeedKmh) {

            if (typeof tempCelsius !== 'number' || typeof windSpeedKmh !== 'number' || isNaN(tempCelsius) || isNaN(windSpeedKmh)) {
                return 'Invalid input';
            }


            const tempF = (tempCelsius * 9 / 5) + 32;
            const windSpeedMph = windSpeedKmh * 0.621371;

            if (tempF <= 50 && windSpeedMph > 3.0) {
                const windChillF =  35.74 + 0.6215 * tempF - 35.75 * Math.pow(windSpeedMph, 0.16) + 0.4275 * tempF * Math.pow(windSpeedMph, 0.16);
                return Math.round(windChillF);
            } else {
                return 'N/A';
            }
        }

        const windChill = calculateWindChill(tempCelsius, windSpeedKmh);
        console.log(windChill);


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
                    <h3 class="capitalize-description">${data.weather[0].description} / Wind: ${data.wind.speed} km/h</h3>
                    <h3 class="capitalize-description">Wind Chill: ${windChill}</h3>
                        <h2 id="weather-celsius">${Math.round(data.main.temp)}°</h2>
                        <div class="sky"> 
                            <img src="images/${weatherIcon}" alt="Weather Icon">
                    </div> 
                </div>
            </div> 
        `;
    })
    .catch(error => console.error('Error fetching current weather data:', error));




