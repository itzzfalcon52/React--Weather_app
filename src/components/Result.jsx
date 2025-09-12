import { useNavigate } from "react-router-dom";
import { UseWeather } from "../contexts/WeatherContext";

function Result({ city, code, setShow, setCity, navigateOnSearch, onSearch }) {
  //const { onClickSearch } = UseWeather();
  const navigation = useNavigate();
  async function handleClick() {
    setCity(city);
    setShow(false);
    // call the onSearch callback passed from Search
    if (onSearch) await onSearch(city);

    if (navigateOnSearch) navigation("/weather");
  }
  return (
    <li
      className="hover:bg-slate-800 flex-1 h-full text-white font-bricolage text-lg font-semibold m-2 flex items-center pl-2 cursor-pointer"
      onClick={handleClick}
    >
      {city},{code}
    </li>
  );
}

export default Result;
