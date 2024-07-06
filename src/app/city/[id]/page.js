"use client";
import "dotenv/config";
import { errorMessageAtom } from "@/components/CitiesSearch";
import { languageAtom } from "@/components/LanguagesSelector";
import { useAtom } from "jotai";
import { useState } from "react";

export default function VisitedCityPage({ params }) {
  const id = params.id;
  const [language] = useAtom(languageAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const apiId = "4fe538ddedee0ec4bc4f3a07a694d493";
  const [visitedCity, setVisitedCity] = useState({
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
  });

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?id=${id}&lang=${language}&units=metric&appid=${apiId}`
  )
    .then((res) => res.json())
    .then((data) => {
      setVisitedCity(() => ({
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US"),
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
      setErrorMessage("Error: Sorry, something went wrong. Please try again.");
    });
  console.log("HIII");
  return (
    <div id="card" className="d-flex flex-column gap-2 p-3">
      <div className="card glass">
        <div className="d-flex justify-content-between">
          <div className="text-dark py-4 px-5">
            <h4 className="mb-0">
              {visitedCity.name}, {visitedCity.country}
              <img src={visitedCity.flag} width="20px" />
            </h4>

            <p className="display-2 my-3">
              <strong>{visitedCity.temp}°C </strong>
            </p>
            <p className="mb-2">
              Feels Like: <strong>{visitedCity.feels_like}°C </strong>
            </p>
            <h5 className="text-capitalize">
              {visitedCity.weatherDescription}
            </h5>
          </div>
          <div className="pe-3 d-flex flex-column">
            <img
              src={`../../../icons/${visitedCity.weatherIcon}.png`}
              width="130px"
            />
            <h5 className="px-2 text-center">
              H: {visitedCity.temp_max}° L: {visitedCity.temp_min}°
            </h5>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 justify-content-between w-100 ">
        <div className="glass d-grid gap-2 w-100 py-4 px-4 fs-5">
          <p>
            Sunrise:
            <br />
            {visitedCity.sunrise}
          </p>
          <p>
            Sunset:
            <br />
            {visitedCity.sunset}
          </p>
        </div>
        <div className="glass w-100 py-4 px-3">
          <div className="d-flex justify-content-between gap-3 text-justify">
            <div className="d-grid gap-2 w-100">
              <p className="display-3">
                <strong>{visitedCity.speed}</strong>
              </p>
              <p className="display-3">
                <strong>{visitedCity.visibility}</strong>
              </p>
            </div>
            <div className="d-grid gap-2 w-100">
              <p className="pt-2">
                KM/H
                <br />
                <strong className="fs-5">Wind</strong>
              </p>
              <p className="pt-2">
                KM
                <br />
                <strong className="fs-5 pb-2">Visibility</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card glass w-100 py-4">
        <div className="d-flex justify-content-between px-4">
          <div className="d-grid gap-2 fs-5">
            <p>Clouds</p>
            <p>Humidity</p>
            <p>Pressure</p>
          </div>
          <div className="d-grid gap-2 fs-5 pe-2">
            <p>{visitedCity.clouds} %</p>
            <p>{visitedCity.humidity} %</p>
            <p>{visitedCity.pressure} hPa</p>
          </div>
        </div>
      </div>
      <div className="card-transparent">&nbsp;</div>
    </div>
  );
}
