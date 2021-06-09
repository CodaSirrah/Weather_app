/* eslint-disable radix */
/* eslint-disable no-console */
const DISPLAY = (target) => {
  const WEATHER_DATA = (temp, feel, humidity, windSpeed, farenheit) => {
    const TEMPERATURE = document.createElement('td');
    if (farenheit === true) {
      TEMPERATURE.textContent = `${temp}℉`;
    } else if (farenheit === false) {
      TEMPERATURE.textContent = `${temp}℃`;
    }

    const FEELSLIKE = document.createElement('td');
    if (farenheit === true) {
      FEELSLIKE.textContent = `${feel}℉`;
    } else if (farenheit === false) {
      FEELSLIKE.textContent = `${feel}℃`;
    }
    const HUMIDITY = document.createElement('td');
    HUMIDITY.textContent = humidity;

    const WIND_SPEED = document.createElement('td');
    WIND_SPEED.textContent = windSpeed;
    // Appending
    target.appendChild(TEMPERATURE);
    target.appendChild(FEELSLIKE);
    target.appendChild(HUMIDITY);
    target.appendChild(WIND_SPEED);
  };

  const WEATHER_LOCATION = (city, country) => {
    const CITY = document.createElement('h2');
    CITY.textContent = city;

    const COUNTRY = document.createElement('h3');
    COUNTRY.textContent = `'${country}'`;

    // appending
    target.appendChild(CITY);
    target.appendChild(COUNTRY);
  };

  const WEATHER_ICON = (type) => {
    const WEATHER_TYPE = document.createElement('i');
    WEATHER_TYPE.setAttribute('id', 'weather-type');
    WEATHER_TYPE.classList.add('fas');
    if (type === 'Clear') {
      WEATHER_TYPE.classList.add('fa-sun');
    } else if (type === 'Drizzle') {
      WEATHER_TYPE.classList.add('fa-cloud-rain');
    } else if (type === 'Clouds') {
      WEATHER_TYPE.classList.add('fa-cloud');
    } else if (type === 'Rain') {
      WEATHER_TYPE.classList.add('fa-cloud-showers-heavy');
    }
    target.appendChild(WEATHER_TYPE);
  };

  const SHOW_AND_HIDE = () => {
    if (target.classList.contains('hidden')) {
      target.classList.remove('hidden');
      setTimeout(() => {
        target.classList.remove('visually-hidden');
      }, 20);
    } else {
      target.classList.add('visually-hidden');
      target.addEventListener(
        'transitionend',
        () => {
          target.classList.add('hidden');
        },
      );
    }
  };

  const FLOAT_DOWN = () => {
    target.classList.add('float-down');
  };

  const CHANGE_MESSAGE = (type) => {
    const NEW_TITLE = target;
    switch (type) {
      case 'Rain':
        NEW_TITLE.textContent = 'Looks like it\'s raining.';
        break;
      case 'Clouds':
        NEW_TITLE.textContent = 'Everything is white and puffy.';
        break;
      case 'Clear':
        NEW_TITLE.textContent = 'It\'s a nice sunny day.';
        break;
      case 'Drizzle':
        NEW_TITLE.textContent = 'Pitter patter on the windowpane.';
        break;
      default:
        NEW_TITLE.textContent = '';
    }
    return NEW_TITLE;
  };

  const CHANGE_WEATHER_CONTAINER = (firstSearch) => {
    DISPLAY(target).CREATE_PLACE_CONTAINER();
    DISPLAY(target).CREATE_TEMP_CONTAINER();
    if (firstSearch === true) {
      DISPLAY(target).SHOW_AND_HIDE();
    }
  };

  const CREATE_PLACE_CONTAINER = () => {
    for (let i = 0; i < target.children.length; i += 1) {
      if (target.children[i].id === 'place-container') {
        target.children[i].remove();
      }
    }
    const PLACE_CONTAINER = document.createElement('section');
    PLACE_CONTAINER.setAttribute('id', 'place-container');
    PLACE_CONTAINER.classList.add('hidden');
    PLACE_CONTAINER.classList.add('visually-hidden');
    target.appendChild(PLACE_CONTAINER);
    DISPLAY(PLACE_CONTAINER).SHOW_AND_HIDE();
  };

  const CREATE_TEMP_CONTAINER = () => {
    for (let i = 0; i < target.children.length; i += 1) {
      if (target.children[i].id === 'temp-container') {
        target.children[i].remove();
      }
    }
    const TEMP_CONTAINER = document.createElement('section');
    const TABLE = document.createElement('table');
    const TR_HEADERS = document.createElement('tr');
    const TH_TEMP = document.createElement('th');
    const TH_FEEL = document.createElement('th');
    const TH_HUMIDITY = document.createElement('th');
    const TH_WIND = document.createElement('th');
    const TR_WEATHER_DATA = document.createElement('tr');

    TEMP_CONTAINER.setAttribute('id', 'temp-container');
    TR_WEATHER_DATA.setAttribute('id', 'weather-data');

    TH_TEMP.textContent = 'Temperature';
    TH_FEEL.textContent = 'Feels Like';
    TH_HUMIDITY.textContent = 'Humidity';
    TH_WIND.textContent = 'Wind Speed';

    TEMP_CONTAINER.classList.add('hidden');
    TEMP_CONTAINER.classList.add('visually-hidden');

    TR_HEADERS.appendChild(TH_TEMP);
    TR_HEADERS.appendChild(TH_FEEL);
    TR_HEADERS.appendChild(TH_HUMIDITY);
    TR_HEADERS.appendChild(TH_WIND);
    TABLE.appendChild(TR_HEADERS);
    TABLE.appendChild(TR_WEATHER_DATA);
    TEMP_CONTAINER.appendChild(TABLE);
    target.appendChild(TEMP_CONTAINER);
    DISPLAY(TEMP_CONTAINER).SHOW_AND_HIDE();
  };

  const CONVERT_TEMP = (farenheit) => {
    let { temperature, feel } = target;
    if (farenheit === true) {
      temperature = parseFloat(temperature);
      temperature = (temperature * (9 / 5)) + 32;
      temperature = Math.round(temperature * 100) / 100;
      temperature = temperature.toString();
      feel = parseFloat(feel);
      feel = (feel * (9 / 5)) + 32;
      feel = Math.round(feel * 100) / 100;
      feel = feel.toString();
    } else {
      temperature = parseFloat(temperature);
      temperature = (temperature - 32) * (5 / 9);
      temperature = Math.round(temperature * 100) / 100;
      temperature = temperature.toString();
      feel = parseFloat(feel);
      feel = (feel - 32) * (5 / 9);
      feel = Math.round(feel * 100) / 100;
      feel = feel.toString();
    }
    return { temperature, feel };
  };

  const TOGGLE_LOCATION = () => {
    target.classList.add('blue');
  };
  return {
    WEATHER_DATA,
    WEATHER_LOCATION,
    WEATHER_ICON,
    SHOW_AND_HIDE,
    FLOAT_DOWN,
    CHANGE_MESSAGE,
    CHANGE_WEATHER_CONTAINER,
    CREATE_PLACE_CONTAINER,
    CREATE_TEMP_CONTAINER,
    CONVERT_TEMP,
    TOGGLE_LOCATION,
  };
};

export default DISPLAY;
