import { useEffect, useState } from "react";
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
import FavoriteCity from "../components/FavoriteCity";
import FavoritesList from "../components/FavoritesList";
import { MoveDownIcon } from "lucide-react";
import { UseFavorites } from "../contexts/FavoritesContext";

function SearchWeather() {
  const { showWeather, weather, loadingWeather, city, setCity, onClickSearch } =
    UseWeather();
  const navigate = useNavigate();
  const [showFavorites, setShowFavorites] = useState(false);

  const { isAdded } = UseFavorites();

  function handleShow() {
    setShowFavorites((fav) => !fav);
  }

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
        {isAdded ? (
          <div className="message flex-2 bg-sky-50 text-gray-800 font-bold text-2xl rounded-2xl text-center">
            City added to your Favorites‼️
          </div>
        ) : (
          <>
            <div onClick={handleShow} className="relative  ">
              <button className="bg-slate-700 p-2 rounded-2xl text-white text-lg flex justify-between items-center cursor-pointer max-sm:p-1 max-sm:text-md max-sm:mr-4">
                Favourites <MoveDownIcon size={16} className="ml-2" />
              </button>
              {showFavorites && (
                <div className="absolute w-128 top-12 rounded-xl right-3 z-50 max-sm:w-64 ">
                  <FavoritesList />
                </div>
              )}
            </div>

            <Units />
          </>
        )}
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
