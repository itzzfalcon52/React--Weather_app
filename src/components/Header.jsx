import { UseWeather } from "../contexts/WeatherContext";
import Units from "./Units";
import { Link } from "react-router-dom";
function Header({ children }) {
  const { weather } = UseWeather();
  return (
    <div
      className={` ${
        weather?.current?.is_day === 1
          ? "bg-teal-50 text-slate-800"
          : "bg-Neutral-900 text-white"
      }`}
    >
      <div className="header p-6 flex justify-between">
        <Link to="/">
          <img
            src="/assets/images/logo-dark.svg"
            alt="logo"
            className="ml-4 max-sm:w-1/2 max-sm:ml-0 "
          ></img>
        </Link>
        {children}
      </div>
      <h1 className="text-5xl  font-bricolage font-bold mt-6 flex justify-center items-center max-sm:text-2xl">
        How's the sky looking today?
      </h1>
    </div>
  );
}

export default Header;
