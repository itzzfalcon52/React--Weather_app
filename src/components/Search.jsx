import { useEffect, useRef, useState } from "react";
import { UseWeather } from "../contexts/WeatherContext";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";

function Search({ city = "", setCity, onSearch, navigateOnSearch = true }) {
  const { error, fetchSearchCities } = UseWeather();
  const inputEl = useRef(null);
  const [show, setShow] = useState(false);
  const [tempCities, setTempCities] = useState([]);
  const [errorSearch, setErrorSearch] = useState("");
  const navigate = useNavigate();

  // 🔍 Autocomplete suggestions
  useEffect(() => {
    if (city.length < 3) return;

    let isMounted = true;

    async function loadCities() {
      try {
        setErrorSearch("");

        const results = await fetchSearchCities(city);
        if (results.length === 0) {
          setTempCities([]);
          setErrorSearch(
            "City with that name does not exist. Please try again 😔"
          );
        }
        if (isMounted) {
          setTempCities(results);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setTempCities([]);
        setErrorSearch("Error finding cities..");
      }
    }

    loadCities();

    return () => {
      isMounted = false;
    };
  }, [city, fetchSearchCities]);

  function handleSearchResults(e) {
    setCity(e.target.value);
    setShow(true);
  }

  // ⌨️ Keyboard shortcuts (space to refocus input)
  useEffect(() => {
    function callBack(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        inputEl.current.focus();
        setCity("");
      }
    }

    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, [setCity]);

  async function handleSearch() {
    const ok = await onSearch(); // context search
    if (ok !== false && navigateOnSearch) {
      navigate("/weather"); // ✅ redirect to SearchWeather page
    }
    setShow(false);
  }

  return (
    <div
      className={`search flex justify-center items-center max-sm:flex-col max-sm:justify-between max-sm:mx-2 row-start-1 row-span-1 col-span-7`}
    >
      <div className="relative basis-128 max-sm:basis-0 max-sm:mb-2 max-sm:w-full">
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
          ref={inputEl}
          onChange={handleSearchResults}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(); // ✅ trigger + navigate
            }
          }}
        />
        {show && (
          <SearchResults
            tempCities={tempCities}
            setCity={setCity}
            setShow={setShow}
            errorSearch={errorSearch}
            navigateOnSearch={navigateOnSearch}
            onSearch={onSearch}
          />
        )}
      </div>
      <button
        className="basis-32 bg-blue-500 ml-4 p-2 rounded-lg text-white active:border-blue-500 active:ring-2 active:ring-blue-500 hover:-translate-y-2 hover:bg-indigo-700 max-sm:basis-0 max-sm:w-full max-sm:ml-0"
        onClick={handleSearch}
      >
        Search
      </button>

      {error && <div className="text-red-500 mt-2">{String(error)}</div>}
    </div>
  );
}

export default Search;
