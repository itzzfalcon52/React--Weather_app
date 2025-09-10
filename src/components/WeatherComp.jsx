import { motion } from "motion/react";
import { UseWeather } from "../contexts/WeatherContext";

function WeatherComp({ label, value, unit }) {
  const { loading } = UseWeather();
  return (
    <div className=" flex-1 flex flex-col px-2 py-1 mr-2 rounded-lg bg-gray-700 justify-around items-center">
      <span className="text-lg text-white font-bricolage font-light ">
        {label}
      </span>
      {loading ? (
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
        <span className="text-3xl font-bricolage font-bold text-white">
          {value !== undefined ? `${value} ${unit}` : "-"}
        </span>
      )}
    </div>
  );
}

export default WeatherComp;
