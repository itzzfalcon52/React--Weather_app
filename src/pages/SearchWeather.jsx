import WeatherCard from "../components/WeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import { UseWeather } from "../contexts/WeatherContext";
import WeatherDetails from "../components/WeatherDetails";
import Search from "../components/Search";
import Header from "../components/Header";
import Units from "../components/Units";

function SearchWeather() {
  const { error, onClickSearch } = UseWeather();
  if (error) {
    // show full screen error when API fails
    return <Error retry={onClickSearch} />;
  }
  return (
    <>
      <Header>
        <Units />
      </Header>
      <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-y-2 gap-x-2 mt-4 p-10  bg-Neutral-900 max-sm:block max-sm:p-2 max-sm:mb=24">
        <Search />
        <WeatherCard />
        <WeatherDetails />
        <DailyForecast />
        <HourlyForecast />
      </div>
    </>
  );
}

export default SearchWeather;
