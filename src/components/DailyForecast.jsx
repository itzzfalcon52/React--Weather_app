import { UseWeather } from "../contexts/WeatherContext";
import DailyForecastElement from "./DailyForecastElement";

function DailyForecast() {
  const { weather, loading, error, convertedWeather } = UseWeather();
  return (
    <div className=" row-start-5 row-span-2  col-span-4 max-sm:mb-6 ">
      <p className="text-3xl text-white font-bricolage font-medium ml-4">
        Daily Forecast
      </p>
      {loading && (
        <div className="forecastContainer flex justify-around items-stretch mt-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-700 rounded-xl mr-2 h-32 animate-pulse"
            ></div>
          ))}
        </div>
      )}
      <div className="forecastContainer flex  justify-around items-stretch mt-6 max-sm:grid max-sm:grid-cols-3 max-sm:grid-rows-3 max-sm:gap-x-2 max-sm:gap-y-6  ">
        {weather?.daily?.time.map((el, i) => (
          <DailyForecastElement
            time={el}
            key={el}
            tempMax={convertedWeather?.daily?.temperature_2m_max[i]}
            tempMin={convertedWeather?.daily?.temperature_2m_min[i]}
            weatherCode={convertedWeather?.daily?.weathercode[i]}
            error={error}
          />
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;
