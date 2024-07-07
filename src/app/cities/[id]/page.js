"use client";
import { Suspense } from "react";

import VisitedCity from "./VisitedCity";
import { useAtom } from "jotai";
import { recentlyViewedAtom } from "@/components/CitiesSearch";

export default function VisitedCityPage({ params }) {
  const [recentlyViewed] = useAtom(recentlyViewedAtom);
  const id = params.id;
  let cityObj = {};

  if (id in recentlyViewed) {
    cityObj = recentlyViewed[id];
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityWrapper cityObj={cityObj} />
    </Suspense>
  );
}

function CityWrapper({ cityObj }) {
  let data;

  if (Object.keys(cityObj).length !== 0) {
    data = {
      sunrise: new Date(cityObj.sys.sunrise * 1000).toLocaleTimeString("en-US"),
      sunset: new Date(cityObj.sys.sunset * 1000).toLocaleTimeString("en-US"),
      name: cityObj.name,
      country: cityObj.sys.country,
      weatherDescription: cityObj.weather[0].description,
      weatherIcon: cityObj.weather[0].icon,
      clouds: cityObj.clouds.all,
      humidity: cityObj.main.humidity,
      pressure: cityObj.main.pressure,
      temp: Math.round(cityObj.main.temp),
      feels_like: Math.round(cityObj.main.feels_like),
      temp_max: Math.round(cityObj.main.temp_max),
      temp_min: Math.round(cityObj.main.temp_min),
      speed: Math.round(cityObj.wind.speed * 3.6),
      visibility: Math.round(cityObj.visibility / 1000),
      flag: `http://openweathermap.org/images/flags/${cityObj.sys.country.toLowerCase()}.png`,
    };
  } else {
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
