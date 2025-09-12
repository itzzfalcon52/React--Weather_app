import HomePage from "../components/HomePage";
import Search from "../components/Search";
import { useState } from "react";
import { UseWeather } from "../contexts/WeatherContext";
import { useNavigate } from "react-router-dom";

function CompareHome() {
  const [cityInput1, setCityInput1] = useState(""); // just the input string
  const [cityData1, setCityData1] = useState(null); // full weather object

  const [cityInput2, setCityInput2] = useState("");
  const [cityData2, setCityData2] = useState(null);

  const { getCityWeather } = UseWeather();
  const navigate = useNavigate();

  async function handleSearch(city, setCityData, setCityName) {
    const data = await getCityWeather(city);
    if (!data) return;
    setCityData(data);
    setCityName(data.location.name);
  }

  async function handleCompare() {
    if (cityData1 && cityData2) {
      navigate("/cities", {
        state: { city1: cityData1, city2: cityData2 },
      });
    }
  }

  return (
    <div className="absolute inset-0 bg-teal-900 min-h-screen w-full max-sm:relative">
      <HomePage>
        <h2 className="text-5xl font-bold text-white mb-4 sm:text=3xl max-sm:-mt-24">
          🌤️ Welcome to Weather Compare
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Compare weather of any two cities to streamline your travel plans
        </p>
      </HomePage>
      <div className="flex cards justify-center items-start gap-8 px-4 mt-8 max-sm:flex-col ">
        {/* First City Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 w-full max-w-md hover:bg-white/15 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
              📍 City 1
            </h3>
            <p className="text-teal-100 text-sm">Search for your first city</p>
          </div>
          {!cityData1 ? (
            <Search
              city={cityInput1}
              setCity={setCityInput1}
              onSearch={() =>
                handleSearch(cityInput1, setCityData1, setCityInput1)
              }
              navigateOnSearch={false}
            />
          ) : (
            <div className="details w-full flex">
              <span className="text-2xl font-bricolage text-white">
                {cityInput1} ,
              </span>
              <span className="text-2xl font-bricolage text-white ">
                {cityData1.location.country}
              </span>
            </div>
          )}
        </div>

        {/* Second City Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 w-full max-w-md hover:bg-white/15 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
              📍 City 2
            </h3>
            <p className="text-teal-100 text-sm">Search for your second city</p>
          </div>
          {!cityData2 ? (
            <Search
              city={cityInput2}
              setCity={setCityInput2}
              onSearch={() =>
                handleSearch(cityInput2, setCityData2, setCityInput2)
              }
              navigateOnSearch={false}
            />
          ) : (
            <div className="details w-full flex">
              <span className="text-2xl font-bricolage text-white">
                {cityInput2} ,
              </span>
              <span className="text-2xl font-bricolage text-white ">
                {cityData2.location.country}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center mt-8 px-4">
        <button
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 "
          disabled={!cityData1 || !cityData2}
          onClick={handleCompare}
        >
          ⚡ Compare Weather
        </button>
      </div>
    </div>
  );
}

export default CompareHome;
