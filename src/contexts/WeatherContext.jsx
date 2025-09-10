import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { UseUnits } from "./UnitsContext";
//import { fetchWeatherApi } from "openmeteo";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const { temperature, precipitation, windSpeed } = UseUnits();

  //const controller = new AbortController();

  const fetchCoordinates = async (city) => {
    setLoading(true);
    setError("");

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name, country } = data.results[0];
      return { latitude, longitude, name, country };
    } else {
      throw new Error("Can't find a city with that name.");
    }
  };

  async function fetchWeather(lat, lng) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max&current_weather=true&timezone=auto`;

      const res = await fetch(url);
      const data = await res.json();

      return {
        current: data.current_weather,
        hourly: data.hourly,
        daily: data.daily,
      };
    } catch (err) {
      setError("Network Error");
      throw err;
    }
  }
  const handleConversion = useCallback(
    (data) => {
      if (!data) return null;

      const converted = { ...data };

      // Temperature
      if (temperature === "°F") {
        converted.current = {
          ...converted.current,
          temperature: ((data?.current?.temperature * 9) / 5 + 32).toFixed(2),
        };
        converted.daily = {
          ...converted.daily,
          temperature_2m_max: data?.daily?.temperature_2m_max?.map((t) =>
            ((t * 9) / 5 + 32).toFixed(2)
          ),
          temperature_2m_min: data?.daily?.temperature_2m_min?.map((t) =>
            ((t * 9) / 5 + 32).toFixed(2)
          ),
        };
        converted.hourly = {
          ...converted.hourly,
          temperature_2m: data?.hourly?.temperature_2m?.map((t) =>
            ((t * 9) / 5 + 32).toFixed(2)
          ),
        };
      }

      // Wind
      if (windSpeed === "km/h") {
        converted.current = {
          ...converted.current,
          windspeed: (data?.current?.windspeed * 3.6).toFixed(2),
        };
        converted.daily = {
          ...converted.daily,
          windspeed_10m_max: data?.daily?.windspeed_10m_max?.map((w) =>
            (w * 3.6).toFixed(2)
          ),
        };
        converted.hourly = {
          ...converted.hourly,
          windspeed_10m: data?.hourly?.windspeed_10m?.map((w) =>
            (w * 3.6).toFixed(2)
          ),
        };
      }
      if (windSpeed === "mph") {
        converted.current.windspeed = (
          data.current.windspeed * 2.23694
        ).toFixed(2);
        converted.hourly.windspeed_10m = data.hourly.windspeed_10m.map((w) =>
          (w * 2.23694).toFixed(2)
        );
        converted.daily.windspeed_10m_max = data.daily.windspeed_10m_max.map(
          (w) => (w * 2.23694).toFixed(2)
        );
      }

      // Precipitation
      if (precipitation === "mm") {
        converted.hourly = {
          ...converted.hourly,
          precipitation: data?.hourly?.precipitation?.map((p) =>
            (p * 25.4).toFixed(2)
          ),
        };
        converted.daily = {
          ...converted.daily,
          precipitation_sum: data?.daily?.precipitation_sum?.map((p) =>
            (p * 25.4).toFixed(2)
          ),
        };
      }

      return converted;
    },
    [temperature, windSpeed, precipitation]
  );

  const convertedWeather = useMemo(() => {
    if (!weather) return null;
    return handleConversion(weather);
  }, [weather, handleConversion]);

  useEffect(
    function () {
      async function getWeather() {
        try {
          if (!location) return;
          const data = await fetchWeather(
            location.latitude,
            location.longitude
          );
          setWeather(data);
        } catch (err) {
          console.error(err);
        }
      }
      getWeather();
    },
    [location, temperature, precipitation, windSpeed]
  );

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  //function handleConversion() {}

  async function handleSearch() {
    if (city.length < 3) return;

    try {
      setLoading(true);
      setError("");
      //setWeather(null);
      setCity("");
      const loc = await fetchCoordinates(city);
      setLocation(loc);
    } catch (err) {
      setError(err.message);
      setLocation(null);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        location,
        loading,
        error,
        onClickSearch: handleSearch,
        weather,
        convertedWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function UseWeather() {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather must be used within a WeatherProvider");
  return context;
}

export { WeatherProvider, UseWeather };
