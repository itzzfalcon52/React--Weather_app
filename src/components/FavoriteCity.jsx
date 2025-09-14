import { UseWeather } from "../contexts/WeatherContext";

function getWeatherEmoji(code) {
  if (code === 0)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-sunny.webp"
        alt="sunny"
      />
    ); // Clear sky

  if (code === 1 || code === 2)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-partly-cloudy.webp"
        alt="partly-cloudy"
      />
    ); // Mainly clear / partly cloudy
  if (code === 3)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-overcast.webp"
        alt="partly-cloudy"
      />
    ); // Overcast

  if (code === 45 || code === 48)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-fog.webp"
        alt="fog"
      />
    ); // Fog / depositing rime fog

  if ([51, 53, 55, 56, 57].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-drizzle.webp"
        alt="drizzle"
      />
    ); // Drizzle / freezing drizzle
  if ([61, 63, 65, 66, 67].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-rain.webp"
        alt="rain"
      />
    ); // Rain / freezing rain
  if ([71, 73, 75, 77].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-snow.webp"
        alt="sunny"
      />
    ); // Snow fall / grains
  if ([80, 81, 82].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-rain.webp"
        alt="rain"
      />
    ); // Rain showers
  if ([85, 86].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-snow.webp"
        alt="snow"
      />
    ); // Snow showers

  if ([95].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-storm.webp"
        alt="storm"
      />
    ); // Thunderstorm (slight/moderate)
  if ([96, 99].includes(code))
    <img
      className="w-full h-full"
      src="/assets/images/icon-storm.webp"
      alt="storm"
    />; // Thunderstorm with hail

  return "❓"; // Unknown
}

function FavoriteCity({ cityObj, deleteFavorites }) {
  const { handleSearch, setLocation } = UseWeather();

  function handleClick() {
    //setCity(cityObj.location.name); //we dont use setweather here as we want both the location and weather to update,so if we pass setcity, it updates location->updates weather using useeffect
    setLocation(cityObj.location); //we use setlocation here as we want as we update locatio, handlesearch will trigger which redirects to city

    handleSearch();
  }
  function handleDelete(e) {
    e.stopPropagation();
    deleteFavorites(cityObj);
  }
  return (
    <li
      className="flex justify-between items-center bg-gray-800 m-2 w-full hover:-translate-y-1 transition p-3"
      onClick={handleClick}
    >
      <div className="w-24 h-24 max-sm:w-8 max-sm:h-8 ">
        {getWeatherEmoji(cityObj.weather.current?.weathercode)}
      </div>
      <p className="text-white font-bricolage font-bold text-xl max-sm:text-md">
        {cityObj.weather.current?.temperature}°
      </p>
      <div className="text-white font-bricolage text-md ">
        {cityObj.location.name},{cityObj.location.country}
      </div>
      <button
        className="w-24 h-24 rounded-full cursor-pointer"
        onClick={handleDelete}
      >
        ❌
      </button>
    </li>
  );
}

export default FavoriteCity;
