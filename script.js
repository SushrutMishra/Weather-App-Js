// script.js
window.addEventListener('load', () => {
  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
});

function showWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  // Fetch weather data for current location
  fetch(`https://api.weatherapi.com/v1/current.json?key=b66c5bfb25949cd68474af13feefe971&q=${latitude},${longitude}`)
    .then(response => response.json())
    .then(data => {
      const currentWeather = document.getElementById('current-weather');
      currentWeather.innerHTML = `
        <h3>${data.location.name}</h3>
        <p>${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
        <p>${data.current.temp_c}°C</p>
      `;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to add additional locations
function addLocation() {
  const locationInput = document.getElementById('location-input');
  const locationList = document.getElementById('location-list');
  
  const location = locationInput.value;
  
  // Fetch weather data for the added location
  fetch(`https://api.weatherapi.com/v1/current.json?key=b66c5bfb25949cd68474af13feefe971&q=${location}`)
    .then(response => response.json())
    .then(data => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${data.location.name}</h3>
        <p>${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
        <p>${data.current.temp_c}°C</p>
      `;
      locationList.appendChild(li);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}