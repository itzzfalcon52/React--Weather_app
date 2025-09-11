import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseWeather } from "../contexts/WeatherContext";
import Header from "../components/Header";
import Units from "../components/Units";
import WeatherCard from "../components/WeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import WeatherDetails from "../components/WeatherDetails";
import Search from "../components/Search";
import ErrorPage from "../components/ErrorPage";
import SearchHome from "./SearchHome";

function SearchWeather() {
  const { showWeather, weather } = UseWeather();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showWeather) {
      navigate("/search", { replace: true });
    }
  }, [showWeather, navigate]);

  if (!showWeather) return null; // <-- prevents SearchHome from rendering

  const isDay = weather?.current?.is_day === 1;

  return (
    <>
      <Header>
        <Units />
      </Header>

      <div
        className={`w-full h-full grid grid-cols-7 grid-rows-7 gap-y-2 gap-x-2 p-10 max-sm:block max-sm:p-2 max-sm:mb-24 
        ${isDay ? "bg-teal-50" : "bg-Neutral-900"}`}
      >
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
