/* eslint-disable no-console */
/* eslint-disable import/extensions */
import './style.css';
import DISPLAY from './display.js';

// selectors
const LOCATION_INPUT = document.querySelector('#location');
const PLACE_CONTAINER = document.querySelector('#place-container');
const SEARCH_CONTAINER = document.querySelector('#search-container');
const FORM = document.querySelector('form');
const TITLE = document.querySelector('#title');
const WEATHER_DATA = document.querySelector('#weather-data');
const WEATHER_CONTAINER = document.querySelector('#weather-container');

let weather = {};
let firstSearch = true;

async function storeWeather(data) {
  weather = {
    city: data.name,
    country: data.sys.country,
    temperature: `${data.main.temp}°`,
    feel: `${data.main.feels_like}°`,
    humidity: `${data.main.humidity}%`,
    type: data.weather[0].main,
    wind: `${data.wind.speed}mph`,
  };
  console.table(weather);
  if (firstSearch === false) {
    DISPLAY(PLACE_CONTAINER).REMOVE_CHILDS();
    DISPLAY(WEATHER_DATA).REMOVE_CHILDS();
  }

  DISPLAY(PLACE_CONTAINER).WEATHER_LOCATION(weather.city, weather.country);
  DISPLAY(WEATHER_DATA).WEATHER_DATA(
    weather.temperature, weather.feel, weather.humidity, weather.wind,
  );
  DISPLAY(PLACE_CONTAINER).WEATHER_ICON(weather.type);
  DISPLAY(TITLE).CHANGE_MESSAGE(weather.type);
  firstSearch = false;
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

location('London');

setTimeout(() => { DISPLAY(TITLE).SHOW_AND_HIDE(); }, 1);
setTimeout(() => { DISPLAY(TITLE).FLOAT_DOWN(); }, 0);
setTimeout(() => { DISPLAY(SEARCH_CONTAINER).SHOW_AND_HIDE(); }, 1);
setTimeout(() => { DISPLAY(WEATHER_CONTAINER).SHOW_AND_HIDE(); }, 1);
