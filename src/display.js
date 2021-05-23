/* eslint-disable no-console */
const DISPLAY = (target) => {
  async function REMOVE_CHILDS() {
    // Remove children to only show one result

    const ARRAY = target.children;
    try {
      for (let i = ARRAY.length - 1; i >= 0; i -= 1) {
        ARRAY[i].remove();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const WEATHER_DATA = (temp, feel, humidity, windSpeed) => {
    const TEMPERATURE = document.createElement('td');
    TEMPERATURE.textContent = temp;

    const FEELSLIKE = document.createElement('td');
    FEELSLIKE.textContent = feel;

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
    } else if (type === 'Rain') {
      WEATHER_TYPE.classList.add('fa-cloud-rain');
    } else if (type === 'Clouds') {
      WEATHER_TYPE.classList.add('fa-cloud');
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
        NEW_TITLE.textContent = 'Looks like it\'s raining';
        break;
      case 'Clouds':
        NEW_TITLE.textContent = 'Cloudy with a chance of meatballs!';
        break;
      case 'Clear':
        NEW_TITLE.textContent = 'It\'s a nice sunny day';
        break;
      default:
        NEW_TITLE.textContent = '';
    }
    return NEW_TITLE;
  };

  return {
    REMOVE_CHILDS,
    WEATHER_DATA,
    WEATHER_LOCATION,
    WEATHER_ICON,
    SHOW_AND_HIDE,
    FLOAT_DOWN,
    CHANGE_MESSAGE,
  };
};

export default DISPLAY;
