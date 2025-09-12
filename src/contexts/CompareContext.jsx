import { createContext, useContext, useState } from "react";
//import { UseWeather } from "./WeatherContext";
//import { useState } from "react";
import { UseWeather } from "../contexts/WeatherContext";

// 1. Create Context
const CompareContext = createContext();

// 2. Provider component
function CompareProvider({ children }) {
  const [cityInput1, setCityInput1] = useState(""); // just the input string
  const [cityData1, setCityData1] = useState(null); // full weather object
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [cityInput2, setCityInput2] = useState("");
  const [cityData2, setCityData2] = useState(null);

  const { getCityWeather } = UseWeather();

  async function handleSearch(city, setCityData, setCityName, setLoading) {
    try {
      setLoading(true);
      const data = await getCityWeather(city);
      if (!data) return;
      setCityData(data);
      setCityName(data.location.name);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CompareContext.Provider
      value={{
        cityData1,
        cityData2,
        handleSearch,
        setCityInput1,
        cityInput1,
        setCityData1,
        setCityData2,
        setCityInput2,
        loading1,
        loading2,
        cityInput2,
        setLoading1,
        setLoading2,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

// 3. Custom hook (nice to have)
function UseCompare() {
  const context = useContext(CompareContext);
  if (context === undefined)
    throw new Error("context was used outside the element");
  return context;
}
export { UseCompare, CompareProvider };
