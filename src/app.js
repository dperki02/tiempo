function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  console.log(response.data);
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let dayTimeElement = document.querySelector("#day-time");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  dayTimeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "5a66ffb09c7a4o246a78be8f021tfdd3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  console.log(searchInput.value);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="weather-forecast-day-details">
      <div class="weather-forecast-day">${day}</div>
      <div class="weather-forecast-icon">⛈️</div>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-high">62°</span>
        <span class="weather-forecast-temperatures-low">45°</span>
      </div>
      </div>
`;
  });

  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Omaha");

displayForecast();
