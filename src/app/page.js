/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Ali Huseynli Student ID: 124694233 Date: 07/05/2024
 *
 ********************************************************************************/

"use client";

import { useAtom } from "jotai";
import WeatherCard, { cityAtom } from "@/components/WeatherCard";
import { languageAtom } from "@/components/LanguagesSelector";
import { useEffect } from "react";
import CitiesSearch, { errorMessageAtom } from "@/components/CitiesSearch";

const apiId = "4fe538ddedee0ec4bc4f3a07a694d493";

export default function Home() {
  const [, setCity] = useAtom(cityAtom);
  const [language] = useAtom(languageAtom);

  const [, setErrorMessage] = useAtom(errorMessageAtom);
  useEffect(() => {
    async function setUserNavigation() {
      const position = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
      searchAndSetCity(position.coords.latitude, position.coords.longitude);
    }

    if (navigator) {
      setUserNavigation();
    }
  }, []);

  function searchAndSetCity(lat, lon) {
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      console.error(
        "Error: Unable to process latitude and/or longitude information."
      );
      setErrorMessage(
        "Error: Unable to process latitude and/or longitude information."
      );
      return;
    }

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${language}&units=metric&appid=${apiId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(() => ({
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
            "en-US"
          ),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US"),
          name: data.name,
          country: data.sys.country,
          weatherDescription: data.weather[0].description,
          weatherIcon: data.weather[0].icon,
          clouds: data.clouds.all,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          temp_max: Math.round(data.main.temp_max),
          temp_min: Math.round(data.main.temp_min),
          speed: Math.round(data.wind.speed * 3.6),
          visibility: Math.round(data.visibility / 1000),
          flag: `http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`,
        }));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "Error: Sorry, something went wrong. Please try again."
        );
      });
  }

  return (
    <main className="h-100">
      <div className="container d-flex gap-5 justify-content-between h-100">
        <WeatherCard />
        <CitiesSearch />
      </div>
    </main>
  );
}
