"use client";

import { useEffect, useState } from "react";

const apiId = "4fe538ddedee0ec4bc4f3a07a694d493";
const mockData = {
  coord: {
    lon: -79.3971,
    lat: 43.708,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 23.28,
    feels_like: 23.73,
    temp_min: 21.9,
    temp_max: 24.7,
    pressure: 1012,
    humidity: 79,
    sea_level: 1012,
    grnd_level: 996,
  },
  visibility: 10000,
  wind: {
    speed: 0.45,
    deg: 16,
    gust: 0.45,
  },
  clouds: {
    all: 69,
  },
  dt: 1720063513,
  sys: {
    type: 2,
    id: 2043365,
    country: "CA",
    sunrise: 1719999658,
    sunset: 1720054951,
  },
  timezone: -14400,
  id: 6167865,
  name: "Toronto",
  cod: 200,
};

const mockCities = [
  {
    name: "Old Toronto",
    local_names: {
      ar: "تورونتو القديمة",
      en: "Old Toronto",
      el: "Παλαιό Τορόντο",
      es: "Toronto",
      fa: "تورنتو",
      ps: "ټورنټو",
      hy: "Տորոնտո",
      gr: "Τορόντον",
      he: "טורונטו הישנה",
      pt: "Toronto",
      ur: "پرانا ٹورانٹو",
      de: "Toronto",
      pa: "ਟੋਰਾਂਟੋ",
      ug: "تورونتو",
      ku: "Toronto",
      fr: "Toronto",
      oc: "Toronto",
      ca: "Toronto",
      pl: "Toronto",
    },
    lat: 43.6534817,
    lon: -79.3839347,
    country: "CA",
    state: "Ontario",
  },
  {
    name: "Toronto",
    local_names: {
      oc: "Toronto",
      ur: "ٹورانٹو",
      pt: "Toronto",
      ar: "تورونتو",
      mr: "टॊरॊंटो",
      ru: "Торонто",
      zh: "多伦多",
      es: "Toronto",
      uk: "Торонто",
      ps: "ټورنټو",
      oj: "Gichi Kiiwenging",
      eo: "Toronto",
      ku: "Toronto",
      kn: "ಟೊರೊಂಟೋ",
      ko: "토론토",
      bn: "টোরোংটো",
      pa: "ਟੋਰਾਂਟੋ",
      hi: "टॊरॊंटो",
      ja: "トロント",
      pl: "Toronto",
      ca: "Toronto",
      he: "טורונטו",
      el: "Τορόντο",
      ug: "تورونتو",
      ta: "டொரொண்டோ",
      gr: "Τορόντον",
      hy: "Տորոնտո",
      en: "Toronto",
      fa: "تورنتو",
      fr: "Toronto",
      de: "Toronto",
    },
    lat: 43.6534817,
    lon: -79.3839347,
    country: "CA",
    state: "Ontario",
  },
  {
    name: "Toronto",
    lat: 41.9048584,
    lon: -90.8640346,
    country: "US",
    state: "Iowa",
  },
  {
    name: "Toronto",
    lat: 37.7989253,
    lon: -95.9491562,
    country: "US",
    state: "Kansas",
  },
  {
    name: "Toronto",
    lat: 46.4524682,
    lon: -63.3799629,
    country: "CA",
    state: "Prince Edward Island",
  },
];

const languages = [
  { name: "English", code: "en" },
  { name: "French", code: "fr" },
  { name: "Azerbaijani", code: "az" },
  { name: "Persian", code: "fa" },
  { name: "Russian", code: "ru" },
];

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [city, setCity] = useState({
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
  const [cities, setCities] = useState([]);
  const [language, setLanguage] = useState("en");
  const [errorMessage, setErrorMessage] = useState(null);

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

    // setCity(() => ({
    //   sunrise: new Date(mockData.sys.sunrise * 1000).toLocaleTimeString(
    //     "en-US"
    //   ),
    //   sunset: new Date(mockData.sys.sunset * 1000).toLocaleTimeString("en-US"),
    //   name: mockData.name,
    //   country: mockData.sys.country,
    //   weatherDescription: mockData.weather[0].description,
    //   weatherIcon: mockData.weather[0].icon,
    //   clouds: mockData.clouds.all,
    //   humidity: mockData.main.humidity,
    //   pressure: mockData.main.pressure,
    //   temp: Math.round(mockData.main.temp),
    //   feels_like: Math.round(mockData.main.feels_like),
    //   temp_max: Math.round(mockData.main.temp_max),
    //   temp_min: Math.round(mockData.main.temp_min),
    //   speed: Math.round(mockData.wind.speed * 3.6),
    //   visibility: Math.round(mockData.visibility / 1000),
    //   flag: `http://openweathermap.org/images/flags/${mockData.sys.country.toLowerCase()}.png`,
    // }));
    // return;

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

  function searchCitiesByName(name) {
    const castedName = String(name);

    if (!castedName) {
      console.error("Error: Unable to process city name.");
      return;
    }

    // setCities(mockCities);
    // return;

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${castedName}&limit=5&appid=${apiId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length < 1) {
          console.error("Error: Unable to find city. Please try again.");
          setErrorMessage("Error: Unable to find city. Please try again.");
          return;
        }
        setCities(data);
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
        <div id="card" className="d-flex flex-column gap-2 p-3">
          <div className="card glass">
            <div className="d-flex justify-content-between">
              <div className="text-dark py-4 px-5">
                <h4 className="mb-0">
                  {city.name}, {city.country}
                  <img src={city.flag} width="20px" />
                </h4>

                <p className="display-2 my-3">
                  <strong>{city.temp}°C </strong>
                </p>
                <p className="mb-2">
                  Feels Like: <strong>{city.feels_like}°C </strong>
                </p>
                <h5 className="text-capitalize">{city.weatherDescription}</h5>
              </div>
              <div className="pe-3 d-flex flex-column">
                <img src={`icons/${city.weatherIcon}.png`} width="130px" />
                <h5 className="px-2 text-center">
                  H: {city.temp_max}° L: {city.temp_min}°
                </h5>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-between w-100 ">
            <div className="glass d-grid gap-2 w-100 py-4 px-4 fs-5">
              <p>
                Sunrise:
                <br />
                {city.sunrise}
              </p>
              <p>
                Sunset:
                <br />
                {city.sunset}
              </p>
            </div>
            <div className="glass w-100 py-4 px-3">
              <div className="d-flex justify-content-between gap-3 text-justify">
                <div className="d-grid gap-2 w-100">
                  <p className="display-3">
                    <strong>{city.speed}</strong>
                  </p>
                  <p className="display-3">
                    <strong>{city.visibility}</strong>
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
                <p>{city.clouds} %</p>
                <p>{city.humidity} %</p>
                <p>{city.pressure} hPa</p>
              </div>
            </div>
          </div>
          <div className="card-transparent">&nbsp;</div>
        </div>
        <div className="py-3 w-100">
          <div className="container-fluid m-0 pt-3 h-100 search">
            <div id="search-field" className="mb-4">
              <form
                className="d-flex"
                role="search"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    alert(
                      "You have pressed Enter key, use Search button instead please."
                    );
                  }
                }}
              >
                <input
                  className="form-control"
                  id="userInput"
                  type="search"
                  placeholder="Enter city name ..."
                  aria-label="Search"
                  value={userInput}
                  onChange={(event) => {
                    setUserInput(event.target.value);
                  }}
                />
                <select
                  id="language-choice"
                  className="form-select mx-2 px-3"
                  value={language}
                  onChange={(event) => {
                    setLanguage(event.target.value);
                  }}
                >
                  {languages.map((item) => {
                    return (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  id="searchBtn"
                  className="btn btn-outline-success"
                  type="button"
                  onClick={() => {
                    searchCitiesByName(userInput);
                    setUserInput("");
                  }}
                >
                  Search
                </button>
              </form>
              {errorMessage && (
                <div
                  id="errorMessage"
                  className="alert alert-danger mt-2"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}
            </div>
            {cities.length > 0 && (
              <div id="cities">
                <div className="text-light mb-1">
                  Cities called {userInput} (click to select):
                </div>
                <ul className="dropdown-menu d-flex flex-column position-relative w-100">
                  {cities.map((city) => {
                    return (
                      <li key={`${city.lat}_${city.name}`}>
                        <button
                          className="dropdown-item text-dark"
                          onClick={() => {
                            searchAndSetCity(city.lat, city.lon);
                          }}
                        >
                          {city.name}, {city.country}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
