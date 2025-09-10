//import { useEffect, useState } from "react";

import { UseWeather } from "../contexts/WeatherContext";

function Search() {
  const { city, setCity, error, onClickSearch } = UseWeather();
  return (
    <div className="search mt-12 flex justify-center items-center max-sm:flex-col max-sm:justify-between max-sm:mx-2  ">
      <div className="relative basis-128 max-sm:basis-0 max-sm:mb-2 max-sm:w-full ">
        <span className="absolute top-0 left-0 m-0.5 py-2">
          <img
            src="/assets/images/icon-search.svg"
            className="w-5 h-5 ml-0.5"
            alt="Search icon"
          />
        </span>
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full border-none text-center px-2 py-2 rounded-lg focus:outline-none text-white bg-gray-700 shadow-sm focus:border-white focus:ring-2 focus:ring-white"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <button
        className="basis-32 bg-Blue-500 ml-4 p-2 rounded-lg text-white active:border-blue-500 active:ring-2 active:ring-blue-500 hover:-translate-y-2 hover:bg-indigo-700 disabled:bg-gray-700 max-sm:basis-0 max-sm:w-full max-sm:ml-0"
        onClick={onClickSearch}
      >
        Search
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default Search;
