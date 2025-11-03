const dailyWeatherObjects = [
  {
    weekday: "sunday",
    temps: {
      F: 45,
    },
    conditions: "cloudy",
  },
  {
    weekday: "monday",
    temps: {
      F: 50,
    },
    conditions: "sunny",
  },
  {
    weekday: "tuesday",
    temps: {
      F: 53,
    },
    conditions: "sunny",
  },
  {
    weekday: "wednesday",
    temps: {
      F: 52,
    },
    conditions: "partly cloudy",
  },
  {
    weekday: "thursday",
    temps: {
      F: 48,
    },
    conditions: "cloudy",
  },
  {
    weekday: "friday",
    temps: {
      F: 42,
    },
    conditions: "sunny",
  },
  {
    weekday: "saturday",
    temps: {
      F: 40,
    },
    conditions: "partly cloudy",
  },
];

function convertFtoC(tempF) {
  return (tempF - 32) * (5 / 9);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateWeatherReport(shouldCelsius) {
  const tempUnit = shouldCelsius ? "C" : "F";

  const forecastStrings = [];

  for (const dayWeather of dailyWeatherObjects) {
    let temp = dayWeather.temps.F;
    if (shouldCelsius) {
      temp = convertFtoC(temp);
    }
    forecastStrings.push(
      `On ${capitalize(dayWeather.weekday)} it will be ${
        dayWeather.conditions
      } with a temperature of ${temp.toFixed(1)} degrees ${tempUnit}.`
    );
  }

  let maxTemp = -Infinity;
  let maxDay;

  for (const dayWeather of dailyWeatherObjects) {
    let temp = dayWeather.temps.F;
    if (shouldCelsius) {
      temp = convertFtoC(temp);
    }
    if (temp > maxTemp) {
      maxTemp = temp;
      maxDay = dayWeather.weekday;
    }
  }

  forecastStrings.push(
    `The warmest day will be ${capitalize(
      maxDay
    )} with a temperature of ${maxTemp.toFixed(1)} degrees ${tempUnit}.`
  );

  let sum = 0;
  for (let i = 0; i < dailyWeatherObjects.length; i++) {
    sum += dailyWeatherObjects[i].temps.F;
  }
  let averageTemp = sum / dailyWeatherObjects.length;
  if (shouldCelsius) {
    averageTemp = convertFtoC(averageTemp);
  }
  forecastStrings.push(
    `The average temperature next week will be ${averageTemp.toFixed(
      1
    )} degrees ${tempUnit}.`
  );

  return forecastStrings;
}

function renderWeather() {
  const forecastNode = document.getElementById("forecast-output");
  const unitsNode = document.getElementById("temp-units");

  const forecastStrings = generateWeatherReport(unitsNode.value === "C");

  clearPreviousWeather();

  for (const forecastString of forecastStrings) {
    const node = document.createElement("p");
    node.innerText = forecastString;
    forecastNode.appendChild(node);
  }
}

function clearPreviousWeather() {
  const forecastNode = document.getElementById("forecast-output");
  while (forecastNode.lastChild) {
    forecastNode.removeChild(forecastNode.lastChild);
  }
}
