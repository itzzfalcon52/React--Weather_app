import WeatherComp from "./WeatherComp";
import { UseWeather } from "../contexts/WeatherContext";
import { useMemo } from "react";
import { UseUnits } from "../contexts/UnitsContext";

function calculateHeatIndex(tempC, humidity) {
  const T = tempC;
  const R = humidity; // in percent

  const HI =
    -8.784695 +
    1.61139411 * T +
    2.338549 * R +
    -0.14611605 * T * R +
    -0.012308094 * T ** 2 +
    -0.016424828 * R ** 2 +
    0.002211732 * T ** 2 * R +
    0.00072546 * T * R ** 2 +
    -0.000003582 * T ** 2 * R ** 2;

  return Math.round(HI * 10) / 10; // round to 1 decimal
}
function calculateWindChill(tempC, windKmh) {
  return Math.round(
    13.12 +
      0.6215 * tempC -
      11.37 * windKmh ** 0.16 +
      0.3965 * tempC * windKmh ** 0.16
  );
}

function WeatherDetails() {
  const { weather, convertedWeather } = UseWeather();
  const { temperature, precipitation, windSpeed } = UseUnits();

  const index = weather?.hourly?.time.findIndex(
    (time) => time.startsWith(weather?.current?.time.slice(0, 13)) // match YYYY-MM-DDTHH
  );

  const values = useMemo(() => {
    if (!weather || index === -1) return {};

    const temp = convertedWeather.hourly.temperature_2m[index];
    const humidity = convertedWeather.hourly.relativehumidity_2m[index];
    const precipitation = convertedWeather.hourly.precipitation[index];
    const tempC = weather.hourly.temperature_2m[index];
    const windMps = weather.hourly.windspeed_10m[index]; // m/s
    const windKmh = windMps * 3.6;
    const wind = convertedWeather.hourly.windspeed_10m[index];

    // Decide “feels like” in **displayed units**
    let feelsLike = temp;

    let feelsLikeC = tempC; // calculate “Feels Like” in Celsius first

    if (tempC >= 27) feelsLikeC = calculateHeatIndex(tempC, humidity);
    else if (tempC <= 10) feelsLikeC = calculateWindChill(tempC, windKmh);

    // Convert “Feels Like” to display unit
    //let feelsLike = feelsLikeC;
    if (temperature === "Fahrenheit (°F)") {
      feelsLike = (feelsLikeC * 9) / 5 + 32;
    }

    return { temp, humidity, wind, precipitation, feelsLike }; // ✅ return object
  }, [convertedWeather, weather, index, temperature]);

  return (
    <div className="col-span-4  row-span-1 row-start-4 mt-4 ml-2  max-sm:ml-0 max-sm:mt-8 max-sm:mb-12 ">
      <div className="weather-details w-full h-full flex justify-around items-stretch max-sm:grid max-sm:grid-cols-2 max-sm:grid-rows-2 max-sm:gap-x-2 max-sm:gap-y-6  ">
        <WeatherComp label="Feels Like" value={values.feelsLike} unit="°" />
        <WeatherComp label="Humidity" value={values.humidity} unit="%" />
        <WeatherComp label="Wind" value={values.wind} unit={windSpeed} />
        <WeatherComp
          label="Precipitation"
          value={values.precipitation}
          unit={precipitation}
        />
      </div>
    </div>
  );
}

export default WeatherDetails;
