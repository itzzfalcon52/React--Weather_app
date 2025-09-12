import { UseUnits } from "../contexts/UnitsContext";
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

function WeatherCompareCard({ cityData, position }) {
  if (!cityData || !cityData.weather) {
    return (
      <div className="flex-1 max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center text-white">
          <div className="text-xl font-medium">No data available</div>
        </div>
      </div>
    );
  }

  const { handleConversion } = UseWeather();

  // ✅ convert only the weather
  const convertedWeather = handleConversion(cityData.weather);

  // ✅ destructure cleanly
  const { location } = cityData;
  const { current, daily, hourly } = convertedWeather;

  const isDay = current?.is_day === 1;

  const cardTheme = isDay
    ? "bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800 shadow-xl"
    : "bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-2xl";

  const tempColor = isDay ? "text-blue-600" : "text-blue-300";
  const subTextColor = isDay ? "text-gray-600" : "text-gray-300";
  const accentColor = isDay ? "bg-blue-500" : "bg-blue-400";

  const todayHigh = daily?.temperature_2m_max?.[0];
  const todayLow = daily?.temperature_2m_min?.[0];
  const todayPrecipitation = daily?.precipitation_sum?.[0] || 0;
  const wind = current?.windspeed || 0;
  const humidity = hourly?.relativehumidity_2m?.[0];

  const { temperature, windSpeed, precipitation } = UseUnits();

  return (
    <div
      className={`flex-1 max-w-md  mx-4 transform transition-all duration-300 hover:scale-105 ${
        position === "left" ? "animate-fade-in-left" : "animate-fade-in-right"
      }`}
    >
      <div className={`${cardTheme} rounded-3xl p-8 `}>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {location?.name}, {location?.country}
          </h2>
          <div className={`w-16 h-1 ${accentColor} mx-auto rounded-full`}></div>
        </div>

        {/* Current Weather */}
        <div className="text-center mb-2 flex justify-center items-center max-sm:flex-col">
          <div className="text-lg mb-4 w-24 h-24">
            {getWeatherEmoji(current?.weathercode)}
          </div>
          <div className={`text-5xl font-light ${tempColor} mb-2`}>
            {current?.temperature || 0} {temperature}
          </div>
          <div className={`text-lg ${subTextColor} ml-8`}>
            {isDay ? "Day" : "Night"}
          </div>
        </div>

        {/* Weather Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-black/10">
            <span className={`${subTextColor}`}>High / Low</span>
            <span className="font-semibold">
              {todayHigh ? todayHigh : "--"}° / {todayLow ? todayLow : "--"}°
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-black/10">
            <span className={`${subTextColor}`}>Wind Speed</span>
            <span className="font-semibold">
              {wind} {windSpeed}
            </span>
          </div>

          {humidity && (
            <div className="flex justify-between items-center py-3 border-b border-black/10">
              <span className={`${subTextColor}`}>Humidity</span>
              <span className="font-semibold">{humidity}%</span>
            </div>
          )}

          <div className="flex justify-between items-center py-3">
            <span className={`${subTextColor}`}>Precipitation</span>
            <span className="font-semibold">
              {todayPrecipitation} {precipitation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCompareCard;
