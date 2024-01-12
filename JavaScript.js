const apiKey = 'fef9e75e8f554ef68d7153335231206';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
const searchHistoryContainer = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history');
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
});

searchHistoryContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('search-history-item')) {
    const city = event.target.dataset.city;
    getWeather(city);
  }
});

clearHistoryButton.addEventListener('click', () => {
  clearSearchHistory();
});

function getWeather(city) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showError(data.error.message);
      } else {
        showWeather(data);
        updateSearchHistory(city);
      }
    })
    .catch(error => {
      showError('An error occurred. Please try again later.');
      console.error(error);
    });
}

function showWeather(data) {
  // Clear previous weather data
  currentWeatherContainer.innerHTML = '';
  forecastContainer.innerHTML = '';

  // Current weather
  const currentWeather = data.current;

  const currentWeatherCard = document.createElement('div');
  currentWeatherCard.classList.add('weather-card');

  const cityElement = document.createElement('h2');
  cityElement.textContent = data.location.name;
  currentWeatherCard.appendChild(cityElement);

  const dateElement = document.createElement('p');
  dateElement.textContent = new Date().toDateString();
  currentWeatherCard.appendChild(dateElement);

  const iconElement = document.createElement('img');
  iconElement.src = currentWeather.condition.icon;
  iconElement.alt = currentWeather.condition.text;
  currentWeatherCard.appendChild(iconElement);

  const tempElement = document.createElement('p');
  tempElement.textContent = `Temperature: ${currentWeather.temp_c}°C`;
  currentWeatherCard.appendChild(tempElement);

  const humidityElement = document.createElement('p');
  humidityElement.textContent = `Humidity: ${currentWeather.humidity}%`;
  currentWeatherCard.appendChild(humidityElement);

  const windElement = document.createElement('p');
  windElement.textContent = `Wind Speed: ${currentWeather.wind_kph} km/h`;
  currentWeatherCard.appendChild(windElement);

  currentWeatherContainer.appendChild(currentWeatherCard);

  // Forecast
  const forecast = data.forecast.forecastday;

  forecast.forEach(day => {
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('weather-card');

    const dateElement = document.createElement('h3');
    dateElement.textContent = new Date(day.date).toDateString();
    forecastCard.appendChild(dateElement);

    const iconElement = document.createElement('img');
    iconElement.src = day.day.condition.icon;
    iconElement.alt = day.day.condition.text;
    forecastCard.appendChild(iconElement);

    const tempElement = document.createElement('p');
    tempElement.textContent = `Temperature: ${day.day.avgtemp_c}°C`;
    forecastCard.appendChild(tempElement);

    const windElement = document.createElement('p');
    windElement.textContent = `Wind Speed: ${day.day.maxwind_kph} km/h`;
    forecastCard.appendChild(windElement);

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${day.day.avghumidity}%`;
    forecastCard.appendChild(humidityElement);

    forecastContainer.appendChild(forecastCard);
  });
}

function updateSearchHistory(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';
  searchHistory.forEach(city => {
    const searchHistoryItem = document.createElement('div');
    searchHistoryItem.classList.add('search-history-item');
    searchHistoryItem.textContent = city;
    searchHistoryItem.setAttribute('data-city', city);
    searchHistoryContainer.appendChild(searchHistoryItem);
  });
}

function clearSearchHistory() {
  searchHistory.length = 0;
  localStorage.removeItem('searchHistory');
  renderSearchHistory();
}

function showError(message) {
  currentWeatherContainer.innerHTML = '';
  forecastContainer.innerHTML = '';

  const errorElement = document.createElement('p');
  errorElement.textContent = message;
  currentWeatherContainer.appendChild(errorElement);
}

renderSearchHistory();