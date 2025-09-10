import { createContext, useContext, useState } from "react";
//import { UseWeather } from "./WeatherContext";

// 1. Create Context
const UnitsContext = createContext();

// 2. Provider component
function UnitsProvider({ children }) {
  const [show, setShow] = useState(false);
  const [temperature, setTemperature] = useState("°C");
  const [windSpeed, setWindSpeed] = useState("mph");
  const [precipitation, setPrecipitation] = useState("in");

  function handleShow() {
    setShow((showed) => !showed);
  }

  function handleSelected(group, value) {
    if (group === "temperature") setTemperature(value);
    if (group === "windspeed") setWindSpeed(value);
    if (group === "precipitation") setPrecipitation(value);

    //setSelected((select) => !select);
    console.log(value);
  }
  function handleDefault() {
    setTemperature("°C");
    setPrecipitation("in");
    setWindSpeed("mph");
  }
  return (
    <UnitsContext.Provider
      value={{
        show,
        setShow,
        temperature,
        setTemperature,
        windSpeed,
        setWindSpeed,
        precipitation,
        setPrecipitation,
        handleShow,
        handleSelected,
        handleDefault,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}

// 3. Custom hook (nice to have)
function UseUnits() {
  const context = useContext(UnitsContext);
  if (context === undefined)
    throw new Error("context was used outside the element");
  return context;
}
export { UseUnits, UnitsProvider };
