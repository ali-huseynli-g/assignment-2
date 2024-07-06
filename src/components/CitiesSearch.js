import { atom, useAtom } from "jotai";
import LanguageSelector, { languageAtom } from "./LanguagesSelector";
import { useState, useEffect } from "react";
import { cityAtom } from "./WeatherCard";
import Pagination from "./Pagination";
import { Alert } from "react-bootstrap";

export const errorMessageAtom = atom(null);
export const citiesAtom = atom([]);
export const recentlyViewedAtom = atom([]);

export default function CitiesSearch() {
  const apiId = "4fe538ddedee0ec4bc4f3a07a694d493";
  const [cities, setCities] = useAtom(citiesAtom);
  const [language] = useAtom(languageAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [userInput, setUserInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 3;
  const [recentlyViewed, setRecentlyViewed] = useAtom(recentlyViewedAtom);

  const lastCityIndex = currentPage * citiesPerPage;
  const firstCityIndex = lastCityIndex - citiesPerPage;
  const currentCities = cities.slice(firstCityIndex, lastCityIndex);

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
    setErrorMessage(null);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${language}&units=metric&appid=${apiId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecentlyViewed(
          !recentlyViewed.map((obj) => obj.id).includes(data.id)
            ? [...recentlyViewed, data]
            : recentlyViewed
        );

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
    setCurrentPage(1);

    if (!castedName) {
      console.error("Error: Unable to process city name.");
      return;
    }

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
        setErrorMessage(null);

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
            <LanguageSelector />
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
            <>
              <br />
              <Alert id={"errorMessage"} variant={"danger"}>
                {errorMessage}
              </Alert>
            </>
          )}
        </div>
        {currentCities.length > 0 && (
          <div id="cities">
            <div className="text-light mb-1">
              Cities called {userInput} (click to select):
            </div>
            <ul className="dropdown-menu d-flex flex-column position-relative w-100">
              {currentCities.map((city) => {
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
            <br />
            <Pagination
              totalCities={cities.length}
              citiesPerPage={citiesPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
