//import { useEffect, useState } from "react";
//mport { UseWeather } from "../contexts/WeatherContext";
import { UseWeather } from "../contexts/WeatherContext";
import Result from "./Result";

function SearchResults({ tempCities, setCity, setShow }) {
  const { loadingSearch } = UseWeather();

  return (
    <>
      {loadingSearch && (
        <div className="w-full h-32 z-10 bg-slate-700 absolute top-12 left-0 rounded-xl flex justify-center items-center">
          <p className="text-white text-xl font-bricolage font-semibold">
            Loading search results...
          </p>
        </div>
      )}

      <ul className="w-full h-64 z-10 bg-slate-700 flex flex-col absolute top-12 left-0 rounded-xl">
        {tempCities.map((city) => (
          <Result
            city={city.name}
            code={city.country_code}
            key={city.id}
            setCity={setCity}
            setShow={setShow}
          />
        ))}
      </ul>
    </>
  );
}

export default SearchResults;
