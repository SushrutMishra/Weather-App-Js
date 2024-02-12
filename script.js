function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city!`;
        infoTxt.classList.add("error");
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, icon} = info.weather[0];
        const {temp, humidity} = info.main;
        const {speed} = info.wind;

        document.getElementById('city').innerText = `${city}, ${country}`;
        document.getElementById('temp').innerText = `${temp}°C`;
        document.getElementById('description').innerText = description;
        document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
        document.getElementById('wind').innerText = `Wind Speed: ${speed} m/s`;

        // Add weather type class to body
        const weatherType = description.toLowerCase().replace(/\s/g, '');
        document.body.classList.add(weatherType);

        infoTxt.classList.remove("pending");
        wrapper.style.transform = "translateX(0)";
        inputField.value = "";

        // Remove weather type class from body after 5 seconds
        setTimeout(() => {
            document.body.classList.remove(weatherType);
        }, 5000);
    }
}