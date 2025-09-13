import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { UseUnits } from "./UnitsContext";
import { useGeolocation } from "../hooks/useGeolocation";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const { temperature, precipitation, windSpeed } = UseUnits();

  const { getPosition } = useGeolocation();

  const fetchCoordinates = async (city) => {
    setLoadingWeather(true);
    setError("");

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name, country } = data.results[0];
      return { latitude, longitude, name, country };
    } else {
      setError("City not found..");
      return null;
    }
  };

  async function reverseGeocode(lat, lng) {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    const data = await res.json();
    return {
      latitude: lat,
      longitude: lng,
      name: data.city || data.locality || data.principalSubdivision,
      country: data.countryName,
    };
  }

  const fetchSearchCities = useCallback(async (value) => {
    setLoadingSearch(true);
    setError("");

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        return data.results;
      } else {
        return [];
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.");
      return [];
    } finally {
      setLoadingSearch(false);
    }
  }, []);

  async function fetchWeather(lat, lng) {
    try {
      setLoadingWeather(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max&current_weather=true&timezone=auto`;

      const res = await fetch(url);
      const data = await res.json();

      return {
        current: data.current_weather,
        hourly: data.hourly,
        daily: data.daily,
      };
    } catch (err) {
      setError(err?.message || "Network Error");
      throw err;
    } finally {
      setLoadingWeather(false);
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

  useEffect(() => {
    async function getWeather() {
      try {
        if (!location) return;
        const data = await fetchWeather(location.latitude, location.longitude);
        setWeather(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    getWeather();
  }, [location, temperature, precipitation, windSpeed]);

  async function getCityWeather(city) {
    //this is only for compare weather as we dont want it to mix with our main data
    if (!city) return null;

    const loc = await fetchCoordinates(city);
    if (!loc) return null;

    const data = await fetchWeather(loc.latitude, loc.longitude);
    return { location: loc, weather: data };
  }

  async function handleGeolocationWeather() {
    try {
      setShowWeather(false);
      setError("");
      setLoadingWeather(true);
      const pos = await getPosition();
      if (!pos) return;
      const loc = await reverseGeocode(pos.latitude, pos.longitude);
      setLocation(loc);
      setShowWeather(true);
      return true;
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to fetch weather from geolocation");
      setLocation(null);
      setWeather(null);
      setShowWeather(false);
      return false;
    }
  }

  async function handleSearch() {
    if (city.length < 3) return;

    try {
      setError("");
      setWeather(null);
      setCity("");
      setLoadingWeather(true);

      const loc = await fetchCoordinates(city);
      if (!loc) {
        setError("Can't find a city with that name.");
        setLocation(null);
        setWeather(null);
        setShowWeather(false);
        return;
      }
      setLocation(loc);
      setShowWeather(true);
    } catch (err) {
      setError(err?.message || "unknown error");
      setLocation(null);
      setWeather(null);
      setShowWeather(false);
    }
  }

  const convertedWeather = useMemo(() => {
    if (!weather) return null;
    return handleConversion(weather);
  }, [weather, handleConversion]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        location,
        loadingSearch,
        loadingWeather,
        error,
        onClickSearch: handleSearch,
        weather,
        convertedWeather,
        fetchCoordinates,
        fetchSearchCities,
        showWeather,
        getCityWeather,
        handleGeolocationWeather,
        handleConversion,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function UseWeather() {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("UseWeather must be used within a WeatherProvider");
  return context;
}

export { WeatherProvider, UseWeather };
