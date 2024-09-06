const apiKey = "fe840f6a3a427eea7462f58f989a8db3";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weathericon"); // Assuming you are selecting by class

async function checkweather(city) {
    try {
        const response = await fetch(apiUrl + city);
        if (!response.ok) {
            throw new Error('Weather data could not be fetched.');
        }
        const data = await response.json();
        console.log(data);

        // Update the HTML elements with the fetched data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

        // Check the weather condition and update the icon accordingly
        if (data.weather[0].main === "Clouds") {
            weathericon.src = "cloudy.png"; // Replace with your cloudy weather image path
        } else if (data.weather[0].main === "Clear") {
            weathericon.src = "Clear.jpeg"; // Replace with your clear weather image path
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "Rain.jpg"; // Replace with your rainy weather image path
        } else if (data.weather[0].main === "Snow") {
            weathericon.src = "Snow.png"; // Replace with your snowy weather image path
        } else {
            weathericon.src = "default.jpg"; // A default image for other weather conditions
        }

    } catch (error) {
        console.error(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});
