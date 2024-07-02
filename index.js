const weatherbtn = document.querySelector(".weather-btn");
const input = document.querySelector(".data-input");
const apiKey = "613b8d4979497852bc3f1edaa2775e6a";
const weatherBox = document.querySelector(".weather-container");

weatherbtn.addEventListener("click", async function () {
  const city = input.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      console.log(weatherData);
      displayWeatherData(weatherData);
    } catch (err) {
      renderError(`${err.message}`);
    }
  } else {
    renderError("Enter a city Name");
  }
});

const getWeatherData = async function (city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const data = await fetch(apiURL);
  if (!data.ok) throw new Error(`Failed To Load Weather`);
  return data.json();
};

const displayWeatherData = async function (weatherData) {
  const html = `
  <h2 class="country">${weatherData.name}</h2>
  <h1 class="temparature">${(weatherData.main.temp - 273).toFixed(1)}°C</h1>
  <p class="weather"><strong>Humidity</strong> : ${
    weatherData.main.humidity
  }%</p>
  <h3 class="sky">overcast ${weatherData.weather[0].main}</h3>
  <h1>${renderWeatherEmoji(weatherData)}</h1>
`;
  weatherBox.insertAdjacentHTML("beforeend", html);
  weatherBox.classList.remove("hidden");
};

const renderWeatherEmoji = function (weatherData) {
  const id = weatherData.weather[0].id;
  console.log(id);
  switch (true) {
    case id >= 200 && id < 300:
      return "⛈️";
    case id >= 300 && id < 500:
      return "🌧️";
    case id >= 500 && id < 600:
      return "🌦️";
    case id >= 600 && id < 700:
      return "🌨️";
    case id >= 700 && id < 800:
      return "🌪️";
    case id === 800:
      return "☀️";
    default:
      return "❓";
  }
};

const renderError = function (errorMessage) {
  const errorElement = document.createElement("div");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("render-error");
  weatherBox.insertAdjacentElement("beforeend", errorElement);
  weatherBox.classList.remove("hidden");
};
