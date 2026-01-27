// 1. Paste your API Key between these quotes
const apiKey = "66fb5983ce568d0fbd7a0ff362168a24"; 

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function checkWeather() {
    const city = cityInput.value;
    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // This catches 404 (not found) and 401 (wrong API key)
            document.getElementById("errorMessage").style.display = "block";
            document.getElementById("weatherInfo").style.display = "none";
            return;
        }

        const data = await response.json();

        // Update the HTML with Data from API
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

        // Show the weather and hide error
        document.getElementById("weatherInfo").style.display = "block";
        document.getElementById("errorMessage").style.display = "none";

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Check your API key or internet.");
    }
}

searchBtn.addEventListener("click", checkWeather);
