const apiKey = "47cc2543c2384bccbbc84201250102"; // Get API key from WeatherAPI
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weather-icon");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = "City not found!";
                weatherIcon.style.display = "none";
            } else {
                errorMessage.textContent = "";
                cityName.textContent = data.location.name;
                temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
                humidity.textContent = `Humidity: ${data.current.humidity}%`;
                condition.textContent = `Condition: ${data.current.condition.text}`;
                weatherIcon.src = data.current.condition.icon;
                weatherIcon.style.display = "block";
            }
        })
        .catch(error => {
            errorMessage.textContent = "Error fetching data!";
        });
}
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, () => {
            errorMessage.textContent = "Geolocation permission denied.";
        });
    } else {
        errorMessage.textContent = "Geolocation is not supported in this browser.";
    }
}

function getWeatherByCoords(lat, lon) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityName.textContent = data.location.name;
            temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
            humidity.textContent = `Humidity: ${data.current.humidity}%`;
            condition.textContent = `Condition: ${data.current.condition.text}`;
            weatherIcon.src = data.current.condition.icon;
            weatherIcon.style.display = "block";
        })
        .catch(error => {
            errorMessage.textContent = "Error fetching location weather!";
        });
}

window.onload = getUserLocation;


let isCelsius = true;
temperature.style.cursor="POinter";

document.getElementById("temperature").addEventListener("click", () => {
    let temp = parseFloat(temperature.textContent.split(" ")[1]);
    if (isCelsius) {
        temp = (temp * 9/5) + 32;
        temperature.textContent = `Temperature: ${temp.toFixed(2)}°F`;
    } else {
        temp = (temp - 32) * 5/9;
        temperature.textContent = `Temperature: ${temp.toFixed(2)}°C`;
    }
    isCelsius = !isCelsius;
});







// const darkModeToggle = document.getElementById("dark-mode-toggle");

// darkModeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");
    
    
//     if (document.body.classList.contains("dark-mode")) {
//         darkModeToggle.textContent = "☀️";
//     } else {
//         darkModeToggle.textContent = "🌙"; 
//     }
// });



