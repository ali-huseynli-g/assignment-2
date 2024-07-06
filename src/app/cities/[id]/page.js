import { Suspense } from "react";

import VisitedCity from "./VisitedCity";

const apiId = "4fe538ddedee0ec4bc4f3a07a694d493";
const cityMock = {
  coord: {
    lon: -79.4163,
    lat: 43.7001,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 26.6,
    feels_like: 26.6,
    temp_min: 25.2,
    temp_max: 27.65,
    pressure: 1009,
    humidity: 62,
    sea_level: 1009,
    grnd_level: 994,
  },
  visibility: 10000,
  wind: {
    speed: 2.68,
    deg: 252,
    gust: 4.47,
  },
  clouds: {
    all: 78,
  },
  dt: 1720292707,
  sys: {
    type: 2,
    id: 2095531,
    country: "CA",
    sunrise: 1720258980,
    sunset: 1720314098,
  },
  timezone: -14400,
  id: 6167865,
  name: "Toronto",
  cod: 200,
};

export default function VisitedCityPage({ params, searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityeWrapper />
    </Suspense>
  );
}

async function CityeWrapper() {
  let data;

  try {
    data = {
      sunrise: new Date(cityMock.sys.sunrise * 1000).toLocaleTimeString(
        "en-US"
      ),
      sunset: new Date(cityMock.sys.sunset * 1000).toLocaleTimeString("en-US"),
      name: cityMock.name,
      country: cityMock.sys.country,
      weatherDescription: cityMock.weather[0].description,
      weatherIcon: cityMock.weather[0].icon,
      clouds: cityMock.clouds.all,
      humidity: cityMock.main.humidity,
      pressure: cityMock.main.pressure,
      temp: Math.round(cityMock.main.temp),
      feels_like: Math.round(cityMock.main.feels_like),
      temp_max: Math.round(cityMock.main.temp_max),
      temp_min: Math.round(cityMock.main.temp_min),
      speed: Math.round(cityMock.wind.speed * 3.6),
      visibility: Math.round(cityMock.visibility / 1000),
      flag: `http://openweathermap.org/images/flags/${cityMock.sys.country.toLowerCase()}.png`,
    };
    // data = await fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?id=${params.id}&lang=${searchParams.language}&units=metric&appid=${apiId}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => ({
    //     sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US"),
    //     sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US"),
    //     name: data.name,
    //     country: data.sys.country,
    //     weatherDescription: data.weather[0].description,
    //     weatherIcon: data.weather[0].icon,
    //     clouds: data.clouds.all,
    //     humidity: data.main.humidity,
    //     pressure: data.main.pressure,
    //     temp: Math.round(data.main.temp),
    //     feels_like: Math.round(data.main.feels_like),
    //     temp_max: Math.round(data.main.temp_max),
    //     temp_min: Math.round(data.main.temp_min),
    //     speed: Math.round(data.wind.speed * 3.6),
    //     visibility: Math.round(data.visibility / 1000),
    //     flag: `http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`,
    //   }));
  } catch (error) {
    data = {
      sunrise: "n/a",
      sunset: "n/a",
      name: "n/a",
      country: "n/a",
      weatherDescription: "n/a",
      weatherIcon: "unknown",
      clouds: "n/a",
      humidity: "n/a",
      pressure: "n/a",
      temp: "n/a",
      feels_like: "n/a",
      temp_max: "n/a",
      temp_min: "n/a",
      speed: "n/a",
      visibility: "n/a",
      flag: "",
    };
  }

  return <VisitedCity data={data} />;
}
