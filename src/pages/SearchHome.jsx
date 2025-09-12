import HomePage from "../components/HomePage";
import Search from "../components/Search";
import { UseWeather } from "../contexts/WeatherContext";

function SearchHome() {
  const { city, setCity, onClickSearch } = UseWeather();
  return (
    <div className="bg-Neutral-900 absolute inset-0 min-h-screen w-full">
      <HomePage>
        <h2 className="text-5xl font-bold text-white mb-4 sm:text=3xl">
          🌤️ Welcome to Weather Now
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Search for a city to get the latest weather updates.
        </p>
        <Search city={city} setCity={setCity} onSearch={onClickSearch} />
      </HomePage>
    </div>
  );
}

export default SearchHome;
