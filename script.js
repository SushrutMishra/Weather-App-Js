document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = 'b66c5bfb25949cd68474af13feefe971'; // API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const cityName = data.name;
            const weatherInfo = `Current weather in ${cityName}: ${temperature}°C, ${description}.`;
            document.querySelector('.weather-info').innerHTML = `<p>${weatherInfo}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError("Error fetching weather data. Please try again later.");
        });
}

function showError(message) {
    document.querySelector('.weather-info').innerHTML = `<p>${message}</p>`;
}