import { UseWeather } from "../contexts/WeatherContext";
import LoaderWeather from "./LoaderWeather";

function findingDay(iSOString) {
  //console.log(iSOString);
  const date = new Date(iSOString);
  //console.log(date);
  const days = [
    "Sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function formatDate(isoString) {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    month: "short", // "Aug"
    day: "2-digit", // "05"
    year: "numeric", // "2025"
  }); // -> "AUG 05, 2025"
}

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
function WeatherCard() {
  const { location, loading, weather, convertedWeather } = UseWeather();

  // Extract current weather once
  const current = weather?.current;

  return (
    <div className="col-span-4  row-span-2 row-start-1 max-sm:mt-4 ">
      <div className="weather-card w-full h-full rounded-2xl m-2 bg-cover bg-[url('/assets/images/bg-today-large.svg')] flex justify-between items-center max-sm:m-0 max-sm:flex-col  ">
        {loading ? (
          // 🔄 Loader inside the card
          <div className="flex w-full h-full justify-center items-center">
            <LoaderWeather />
          </div>
        ) : current ? (
          <>
            {/* Location + Date */}
            <div className="country flex-3 ml-12">
              <p className="font-bricolage text-4xl  max-sm:mt-4 text-white ">
                {location?.name}, {location?.country}
              </p>

              <p className="font-bricolage font-extralight text-xl text-white mt-4 flex justify-between gap-4">
                {findingDay(current.time)}
                {formatDate(current.time)} {/* e.g. Aug 05 2025 */}
              </p>
            </div>

            {/* Weather Emoji + Temp */}
            <div className="weather flex-2 flex justify-center items-center">
              <div className="emoji  ">
                {getWeatherEmoji(current.weathercode)}
              </div>
              <div className="Temp font-bricolage font-bold text-6xl text-white mr-12">
                {`${convertedWeather?.current.temperature}°`}
              </div>
            </div>
          </>
        ) : (
          <p className="text-white ml-12 max">
            Start searching for a city to get its weather..
          </p>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
