export default function VisitedCity({ data }) {
  return (
    <div className="container d-flex gap-5 justify-content-between h-100">
      <div className="py-3 w-100"></div>
      <div id="card" className="d-flex flex-column gap-2 p-3">
        <div className="card glass">
          <div className="d-flex justify-content-between">
            <div className="text-dark py-4 px-5">
              <h4 className="mb-0">
                {data.name}, {data.country}
                <img src={data.flag} width="20px" className="ms-1" />
              </h4>

              <p className="display-2 my-3">
                <strong>{data.temp}°C </strong>
              </p>
              <p className="mb-2">
                Feels Like: <strong>{data.feels_like}°C </strong>
              </p>
              <h5 className="text-capitalize">{data.weatherDescription}</h5>
            </div>
            <div className="pe-3 d-flex flex-column">
              <img
                src={`../../../icons/${data.weatherIcon}.png`}
                width="130px"
              />
              <h5 className="px-2 text-center d-grid">
                <span>H: {data.temp_max}°</span>
                <span>L: {data.temp_min}°</span>
              </h5>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-between w-100 ">
          <div className="glass d-grid gap-2 w-100 py-4 px-4 fs-5">
            <p>
              Sunrise:
              <br />
              {data.sunrise}
            </p>
            <p>
              Sunset:
              <br />
              {data.sunset}
            </p>
          </div>
          <div className="glass w-100 py-4 px-3">
            <div className="d-flex justify-content-between gap-3 text-justify">
              <div className="d-grid gap-2 w-100">
                <p className="display-3">
                  <strong>{data.speed}</strong>
                </p>
                <p className="display-3">
                  <strong>{data.visibility}</strong>
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
              <p>{data.clouds} %</p>
              <p>{data.humidity} %</p>
              <p>{data.pressure} hPa</p>
            </div>
          </div>
        </div>
        <div className="card-transparent">&nbsp;</div>
      </div>
      <div className="py-3 w-100"></div>
    </div>
  );
}
