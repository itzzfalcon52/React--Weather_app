import { motion } from "motion/react";
import { UseWeather } from "../contexts/WeatherContext";

function WeatherComp({ label, value, unit }) {
  const { loadingWeather, weather } = UseWeather();
  return (
    <div
      className={`flex-1 flex flex-col px-2 py-1 mr-2 rounded-lg  justify-around items-center ${
        weather?.current?.is_day === 1 ? "bg-blue-300" : "bg-gray-700"
      }`}
    >
      <span
        className={`text-lg font-bricolage font-light ${
          weather?.current?.is_day === 1 ? " text-gray-800" : "text-white"
        }`}
      >
        {label}
      </span>
      {loadingWeather ? (
        <motion.span
          className="text-lg text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          -
        </motion.span>
      ) : (
        <span
          className={`text-3xl font-bricolage font-bold   ${
            weather?.current?.is_day === 1 ? " text-gray-800" : "text-white"
          }`}
        >
          {value !== undefined ? `${value} ${unit}` : "-"}
        </span>
      )}
    </div>
  );
}

export default WeatherComp;
