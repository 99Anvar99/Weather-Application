const apiKey = 'fef9e75e8f554ef68d7153335231206';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
const searchHistoryContainer = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history');
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

searchForm.addEventListener('submit', handleSearch);
searchHistoryContainer.addEventListener('click', handleHistoryClick);
clearHistoryButton.addEventListener('click', clearSearchHistory);

function handleSearch(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
}

function handleHistoryClick(event) {
  if (event.target.classList.contains('search-history-item')) {
    const city = event.target.dataset.city;
    getWeather(city);
  }
}

async function getWeather(city) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.error) {
      showError(data.error.message);
    } else {
      showWeather(data);
      updateSearchHistory(city);
    }
  } catch (error) {
    showError('An error occurred. Please try again later.');
    console.error(error);
  }
}

function showWeather(data) {
  currentWeatherContainer.innerHTML = '';
  forecastContainer.innerHTML = '';

  const { current, location, forecast } = data;

  const currentWeatherCard = createWeatherCard({
    title: location.name,
    date: new Date().toDateString(),
    icon: current.condition.icon,
    alt: current.condition.text,
    temperature: `Temperature: ${current.temp_c}°C`,
    humidity: `Humidity: ${current.humidity}%`,
    wind: `Wind Speed: ${current.wind_kph} km/h`
  });

  currentWeatherContainer.appendChild(currentWeatherCard);

  forecast.forecastday.forEach(day => {
    const forecastCard = createWeatherCard({
      title: new Date(day.date).toDateString(),
      icon: day.day.condition.icon,
      alt: day.day.condition.text,
      temperature: `Temperature: ${day.day.avgtemp_c}°C`,
      wind: `Wind Speed: ${day.day.maxwind_kph} km/h`,
      humidity: `Humidity: ${day.day.avghumidity}%`
    });

    forecastContainer.appendChild(forecastCard);
  });
}

function createWeatherCard({ title, date, icon, alt, temperature, humidity, wind }) {
  const card = document.createElement('div');
  card.classList.add('weather-card');

  if (title) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    card.appendChild(titleElement);
  }

  if (date) {
    const dateElement = document.createElement('p');
    dateElement.textContent = date;
    card.appendChild(dateElement);
  }

  if (icon) {
    const iconElement = document.createElement('img');
    iconElement.src = icon;
    iconElement.alt = alt;
    card.appendChild(iconElement);
  }

  if (temperature) {
    const tempElement = document.createElement('p');
    tempElement.textContent = temperature;
    card.appendChild(tempElement);
  }

  if (humidity) {
    const humidityElement = document.createElement('p');
    humidityElement.textContent = humidity;
    card.appendChild(humidityElement);
  }

  if (wind) {
    const windElement = document.createElement('p');
    windElement.textContent = wind;
    card.appendChild(windElement);
  }

  return card;
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