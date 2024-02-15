document.addEventListener('DOMContentLoaded', getWeatherForCurrentLocation);

function getWeatherForCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeatherForCurrentLocation);
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

function showWeatherForCurrentLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = 'b66c5bfb25949cd68474af13feefe971';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetchWeather(apiUrl, "current-location-card");
}

function fetchWeather(apiUrl, cardId) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const cityName = data.name;
            const weatherInfo = `Current weather in ${cityName}: ${temperature}°C, ${description}.`;
            updateWeatherCard(cardId, weatherInfo);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError("Error fetching weather data. Please try again later.");
        });
}

function updateWeatherCard(cardId, weatherInfo) {
    const weatherCard = document.getElementById(cardId);
    weatherCard.querySelector('.weather-info').innerHTML = `<p>${weatherInfo}</p>`;
}

function showError(message) {
    const weatherCard = document.getElementById('current-location-card');
    weatherCard.querySelector('.weather-info').innerHTML = `<p>${message}</p>`;
}

document.querySelector('.search button').addEventListener('click', searchWeather);

function searchWeather() {
    const cityName = document.querySelector('.search input').value;
    const apiKey = 'b66c5bfb25949cd68474af13feefe971';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    createWeatherCard(cityName, apiUrl);
    // Clear input field after search
    document.querySelector('.search input').value = '';
}

function createWeatherCard(cityName, apiUrl) {
    const weatherCardsContainer = document.querySelector('.weather-cards');
    const newCardId = `weather-card-${cityName.replace(/\s+/g, '-')}`; // Replace spaces with dashes for the ID
    const newWeatherCard = document.createElement('div');
    newWeatherCard.classList.add('weather-card');
    newWeatherCard.setAttribute('id', newCardId);
    newWeatherCard.innerHTML = `
        <h2>${cityName}</h2>
        <div class="weather-info">
            <p>Loading...</p>
        </div>
    `;
    weatherCardsContainer.appendChild(newWeatherCard);

    fetchWeather(apiUrl, newCardId);
}