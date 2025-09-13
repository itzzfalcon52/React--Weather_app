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
import LoaderFullScreen from "../components/LoaderFullScreen";

function SearchWeather() {
  const { showWeather, weather, loadingWeather, city, setCity, onClickSearch } =
    UseWeather();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showWeather && !loadingWeather) {
      navigate("/search", { replace: true });
    }
  }, [showWeather, loadingWeather, navigate]);

  if (loadingWeather) return <LoaderFullScreen />;
  if (!showWeather) return null;

  const isDay = weather?.current?.is_day === 1;

  return (
    <>
      <Header>
        <Units />
      </Header>

      <div
        className={`w-screen h-screen grid grid-cols-7 grid-rows-7 gap-y-2 gap-x-2 p-10 max-sm:block max-sm:p-2 max-sm:mb-24  max-sm:min-h-screen overflow-auto
        ${isDay ? "bg-teal-50" : "bg-Neutral-900"}`}
      >
        <div className="col-span-7">
          <Search city={city} setCity={setCity} onSearch={onClickSearch} />
        </div>
        <WeatherCard />
        <WeatherDetails />
        <DailyForecast />
        <HourlyForecast />
      </div>
    </>
  );
}

export default SearchWeather;
