import WeatherCard from "../components/WeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import { UseWeather } from "../contexts/WeatherContext";
import WeatherDetails from "../components/WeatherDetails";
import Search from "../components/Search";
import Header from "../components/Header";
import Units from "../components/Units";
import ErrorPage from "../components/ErrorPage";

function SearchWeather() {
  const { showWeather } = UseWeather();

  return (
    <>
      <Header>
        <Units />
      </Header>

      {!showWeather ? (
        // ✅ Empty state when no weather yet
        <div className="flex flex-col  mt-24 h-[80vh] text-center p-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            🌤️ Welcome to WeatherApp
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Search for a city to get the latest weather updates.
          </p>
          <Search />
        </div>
      ) : (
        // ✅ Full weather grid when results available
        <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-y-2 gap-x-2 mt-4 p-10 bg-Neutral-900 max-sm:block max-sm:p-2 max-sm:mb-24">
          <Search />
          <WeatherCard />
          <WeatherDetails />
          <DailyForecast />
          <HourlyForecast />
        </div>
      )}
    </>
  );
}

export default SearchWeather;
