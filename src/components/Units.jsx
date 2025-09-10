import { UseUnits } from "../contexts/UnitsContext";
import { UseWeather } from "../contexts/WeatherContext";

function Units() {
  const {
    show,
    temperature,
    windSpeed,
    precipitation,
    handleShow,
    handleSelected,
    handleDefault,
  } = UseUnits();

  return (
    <div className="relative inline-block text-left z-100 ">
      <button
        className="inline-flex w-full justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600"
        onClick={handleShow}
      >
        Units
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`  ${
          !show ? "hidden" : ""
        } absolute  right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
      >
        <div className="py-1">
          <div
            className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
            onClick={handleDefault}
          >
            Switch to Imperial
            {temperature === "°C" &&
              windSpeed === "mph" &&
              precipitation === "in" && <span>✅</span>}
          </div>

          {/* Temperature */}
          <div className="px-4 py-1 text-xs uppercase text-gray-400">
            Temperature
          </div>
          {["°C", "°F"].map((temp) => (
            <div
              key={temp}
              className={` ${
                temp === temperature ? "bg-gray-900" : ""
              }px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer flex justify-between`}
              onClick={() => handleSelected("temperature", temp)}
            >
              {temp === "°F" ? "Fahrenheit (°F)" : "Celcius(°C)"}
              {temp === temperature && <span>✅</span>}
            </div>
          ))}

          {/* Wind */}
          <div className="px-4 py-1 text-xs uppercase text-gray-400">
            Wind Speed
          </div>
          {["km/h", "mph"].map((wind) => (
            <div
              key={wind}
              className={` ${
                wind === windSpeed ? "bg-gray-900" : ""
              }px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer flex justify-between`}
              onClick={() => handleSelected("windspeed", wind)}
            >
              {wind}
              {wind === windSpeed && <span>✅</span>}
            </div>
          ))}

          {/* Precipitation */}
          <div className="px-4 py-1 text-xs uppercase text-gray-400">
            Precipitation
          </div>
          {["mm", "in"].map((precip) => (
            <div
              key={precip}
              className={` ${
                precip === precipitation ? "bg-gray-900" : ""
              }px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer flex justify-between`}
              onClick={() => handleSelected("precipitation", precip)}
            >
              <p>{precip === "mm" ? "Millimeters (mm)" : "Inches (in)"}</p>
              {precip === precipitation && <span>✅</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Units;
