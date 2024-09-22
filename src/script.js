// Retrieve data and present it in HTML
function retrieveWeather(response) {
  let temperatureElement = document.querySelector("#today-temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description-today");

  let humidityElement = document.querySelector("#humidity-today");
  let humidity = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind-today");
  let windSpeed = response.data.wind.speed;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");

  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = getDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity} %`;
  windElement.innerHTML = `${windSpeed} km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}
//format date
function getDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDay[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// make API call
function searchCity(city) {
  let apiKey = "t9a2a93f2foa4bf13b03418bbececc07";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveWeather);
}

//Search bar Input to HTML
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
