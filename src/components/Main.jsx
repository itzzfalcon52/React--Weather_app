import WeatherCard from "./WeatherCard";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import { UseWeather } from "../contexts/WeatherContext";
import WeatherDetails from "./WeatherDetails";

function Main() {
  //const { weather } = UseWeather();
  return (
    <div className="w-full h-full grid grid-cols-7 grid-rows-6 gap-y-2 gap-x-2 mt-4 p-10  bg-Neutral-900 max-sm:block max-sm:p-2 max-sm:mb=24">
      <WeatherCard />
      <WeatherDetails />
      <DailyForecast />
      <HourlyForecast />
    </div>
  );
}

export default Main;
