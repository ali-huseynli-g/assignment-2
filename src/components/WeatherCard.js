import { atom, useAtom } from "jotai";

export const cityAtom = atom({
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

export default function WeatherCard() {
  const [city] = useAtom(cityAtom);

  return (
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
  );
}
