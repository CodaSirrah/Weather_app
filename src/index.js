/* eslint-disable no-console */
/* eslint-disable import/extensions */
import './style.css';
import DISPLAY from './display.js';

// selectors
const WEATHER_CONTAINER = document.querySelector('#weather-container');
const LOCATION_INPUT = document.querySelector('#location');
const SEARCH_CONTAINER = document.querySelector('#search-container');
const FORM = document.querySelector('form');
const TITLE = document.querySelector('#title');
const SWITCH = document.querySelector('#checkbox');

let weather = {};
let firstSearch = true;
let farenheit = false;

async function storeWeather(data) {
  weather = {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feel: data.main.feels_like,
    humidity: `${data.main.humidity}%`,
    type: data.weather[0].main,
    wind: `${data.wind.speed}mph`,
  };
  if (farenheit === true) {
    const NEW_TEMP = DISPLAY(weather).CONVERT_TEMP(farenheit);
    weather.temperature = NEW_TEMP.temperature;
    weather.feel = NEW_TEMP.feel;
  }
  DISPLAY(WEATHER_CONTAINER).CHANGE_WEATHER_CONTAINER(firstSearch);
  DISPLAY(document.querySelector('#place-container')).WEATHER_LOCATION(weather.city, weather.country);
  DISPLAY(document.querySelector('#weather-data')).WEATHER_DATA(
    weather.temperature, weather.feel, weather.humidity, weather.wind, farenheit,
  );
  DISPLAY(document.querySelector('#place-container')).WEATHER_ICON(weather.type);
  DISPLAY(TITLE).CHANGE_MESSAGE(weather.type);

  if (firstSearch === true) {
    setTimeout(() => { DISPLAY(TITLE).SHOW_AND_HIDE(); }, 1);
    setTimeout(() => { DISPLAY(TITLE).FLOAT_DOWN(); }, 0);
  }

  firstSearch = false;
  return weather;
}

async function location(city) {
  try {
    const place = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4cb92c5e21465a098adfe5ac36998bda`,
      {
        mode: 'cors',
      },
    );
    const json = await place.json();
    storeWeather(json);
  } catch (err) {
    console.log(err);
  }
}

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
});

FORM.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    location(LOCATION_INPUT.value);
    LOCATION_INPUT.value = '';
  }
});

setTimeout(() => { DISPLAY(SEARCH_CONTAINER).SHOW_AND_HIDE(); }, 1);

SWITCH.addEventListener('click', () => {
  if (farenheit === false) {
    farenheit = true;
  } else {
    farenheit = false;
  }
  const NEW_TEMP = DISPLAY(weather).CONVERT_TEMP(farenheit);

  weather.temperature = NEW_TEMP.temperature;
  weather.feel = NEW_TEMP.feel;
  if (firstSearch === false) {
    if (farenheit === true) {
      document.querySelector('#weather-data').children[0].textContent = `${weather.temperature}℉`;
      document.querySelector('#weather-data').children[1].textContent = `${weather.temperature}℉`;
    } else if (farenheit === false) {
      document.querySelector('#weather-data').children[0].textContent = `${weather.temperature}℃`;
      document.querySelector('#weather-data').children[1].textContent = `${weather.temperature}℃`;
    }
  }
});
