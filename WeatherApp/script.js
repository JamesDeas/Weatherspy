const apiKey = "2bacd5d44287eb5b05b9dc7f7674a123"; // Unique API Key

// Get user's current location
document
  .getElementById("geolocation-btn")
  .addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Use latitude and longitude to fetch city name
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const cityInput = document.getElementById("city-input");
            cityInput.value = data.name; // Update city input field with the fetched city name
          })
          .catch((error) => {
            console.error(
              "There was a problem with your fetch operation:",
              error
            );
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

//Get data in the city-input field

document.getElementById("search-btn").addEventListener("click", function () {
  var cityInput = document.getElementById("city-input");
  var city = cityInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Add units=metric to the API URL to get temperature in Celsius

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Convert temperature from Kelvin to Celsius
      const temperatureCelsius = data.main.temp;
      // Update the weather-info div with the fetched weather data
      const weatherInfoDiv = document.getElementById("weather-info"); // Display results
      weatherInfoDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2><br> 
            <p>Temperature: ${temperatureCelsius}°C</p>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});
