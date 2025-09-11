import { UseWeather } from "../contexts/WeatherContext";

function Result({ city, code, setShow, setCity }) {
  const { onClickSearch } = UseWeather();
  function handleClick() {
    setCity(city);
    onClickSearch();
    setShow(false);
  }
  return (
    <li
      className="hover:bg-slate-800 flex-1 h-full text-white font-bricolage text-lg font-semibold m-2 flex items-center pl-2"
      onClick={handleClick}
    >
      {city},{code}
    </li>
  );
}

export default Result;
