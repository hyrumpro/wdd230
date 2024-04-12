const apiKey = '88676267acbf625addc2fd78c7960a55';
const city = 'Cozumel';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        const highTemp = document.getElementById('high-temp');
        weatherInfo.innerHTML = `
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Conditions:</strong> ${data.weather[0].main}</p>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="50" height="50">
    `;

        highTemp.textContent = data.main.temp_max;
    })
    .catch(error => {
        console.log('Error fetching weather data:', error);
    });

// Close the high temperature message
const closeMessage = document.getElementById('close-message');
const highTempMessage = document.getElementById('high-temp-message');

closeMessage.addEventListener('click', () => {
    highTempMessage.style.display = 'none';
});