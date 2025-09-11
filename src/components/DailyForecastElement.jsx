import { UseWeather } from "../contexts/WeatherContext";

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

function DailyForecastElement({ time, tempMax, tempMin, weatherCode, error }) {
  const { weather } = UseWeather();
  return (
    <div
      className={`flex-1 rounded-xl mr-2  ${
        weather?.current?.is_day === 1 ? " bg-blue-300" : "bg-gray-700"
      }`}
    >
      <div
        className={`text-xl font-bricolage  font-medium flex justify-center ${
          weather?.current?.is_day === 1 ? " text-gray-800" : "text-white"
        }`}
      >
        {findingDay(time).slice(0, 3)}
      </div>
      <div className="">{getWeatherEmoji(weatherCode)}</div>
      <div className="flex justify-between items-centre">
        <p
          className={`font-bricolage font-bold text-md p-2 ${
            weather?.current?.is_day === 1 ? " text-gray-800" : "text-white"
          }`}
        >
          {!error ? `${tempMin}°` : String(error)}
        </p>
        <p
          className={`font-bricolage font-bold text-md p-2 ${
            weather?.current?.is_day === 1 ? " text-gray-800" : "text-white"
          }`}
        >
          {!error ? `${tempMax}°` : String(error)}
        </p>
      </div>
    </div>
  );
}

export default DailyForecastElement;
