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
  const { weather } = UseWeather();

  return (
    <div className="relative inline-block text-left z-100">
      {/* Trigger Button */}
      <button
        className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium transition ${
          weather?.current?.is_day === 1
            ? "bg-blue-300 text-gray-800 hover:bg-blue-400"
            : "bg-gray-700 text-white shadow-sm hover:bg-gray-600"
        }`}
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

      {/* Dropdown */}
      <div
        className={`${
          !show ? "hidden" : ""
        } absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          weather?.current?.is_day === 1
            ? "bg-blue-400 text-gray-800"
            : "bg-gray-800 text-white"
        }`}
      >
        <div className="py-1">
          {/* Default Switch */}
          <div
            className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center ${
              weather?.current?.is_day === 1
                ? "hover:bg-blue-500 text-gray-800"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={handleDefault}
          >
            <span>Switch to Imperial</span>
            <span className="w-4 h-4 flex items-center justify-center">
              {temperature === "°C" &&
                windSpeed === "mph" &&
                precipitation === "in" && (
                  <img
                    className="w-4 h-4"
                    src="/assets/images/icon-checkmark.svg"
                    alt="selected"
                  />
                )}
            </span>
          </div>

          {/* Temperature */}
          <div
            className={`px-4 py-1 text-xs uppercase ${
              weather?.current?.is_day === 1
                ? "text-black font-bold"
                : "text-gray-400"
            }`}
          >
            Temperature
          </div>
          {["°C", "°F"].map((temp) => (
            <div
              key={temp}
              className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center ${
                temp === temperature
                  ? weather?.current?.is_day
                    ? "bg-Blue-500"
                    : "bg-Neutral-900"
                  : ""
              } ${
                weather?.current?.is_day === 1
                  ? "text-gray-800 hover:bg-blue-500"
                  : "text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => handleSelected("temperature", temp)}
            >
              <span>{temp === "°F" ? "Fahrenheit (°F)" : "Celsius (°C)"}</span>
              <span className="w-4 h-4 flex items-center justify-center">
                {temp === temperature && (
                  <img
                    className="w-4 h-4"
                    src="/assets/images/icon-checkmark.svg"
                    alt="selected"
                  />
                )}
              </span>
            </div>
          ))}

          {/* Wind */}
          <div
            className={`px-4 py-1 text-xs uppercase ${
              weather?.current?.is_day === 1
                ? "text-black font-bold"
                : "text-gray-400"
            }`}
          >
            Wind Speed
          </div>
          {["km/h", "mph"].map((wind) => (
            <div
              key={wind}
              className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center ${
                wind === windSpeed
                  ? weather?.current?.is_day
                    ? "bg-Blue-500"
                    : "bg-Neutral-900"
                  : ""
              } ${
                weather?.current?.is_day === 1
                  ? "text-gray-800 hover:bg-blue-500"
                  : "text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => handleSelected("windspeed", wind)}
            >
              <span>{wind}</span>
              <span className="w-4 h-4 flex items-center justify-center">
                {wind === windSpeed && (
                  <img
                    className="w-4 h-4"
                    src="/assets/images/icon-checkmark.svg"
                    alt="selected"
                  />
                )}
              </span>
            </div>
          ))}

          {/* Precipitation */}
          <div
            className={`px-4 py-1 text-xs uppercase ${
              weather?.current?.is_day === 1
                ? "text-black font-bold"
                : "text-gray-400"
            }`}
          >
            Precipitation
          </div>
          {["mm", "in"].map((precip) => (
            <div
              key={precip}
              className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center ${
                precip === precipitation
                  ? weather?.current?.is_day
                    ? "bg-Blue-500"
                    : "bg-Neutral-900"
                  : ""
              } ${
                weather?.current?.is_day === 1
                  ? "text-gray-800 hover:bg-blue-500"
                  : "text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => handleSelected("precipitation", precip)}
            >
              <span>
                {precip === "mm" ? "Millimeters (mm)" : "Inches (in)"}
              </span>
              <span className="w-4 h-4 flex items-center justify-center">
                {precip === precipitation && (
                  <img
                    className="w-4 h-4"
                    src="/assets/images/icon-checkmark.svg"
                    alt="selected"
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Units;
