import HomePage from "../components/HomePage";
import Search from "../components/Search";

import LoaderWeather from "../components/LoaderWeather";
import { UseCompare } from "../contexts/CompareContext";
import { useNavigate } from "react-router-dom";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";

function CompareHome() {
  const navigate = useNavigate();
  const {
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
    setLoading1,
    setLoading2,
    cityInput2,
  } = UseCompare();

  function handleEdit(setCityData) {
    setCityData(null);
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
                handleSearch(
                  cityInput1,
                  setCityData1,
                  setCityInput1,
                  setLoading1
                )
              }
              navigateOnSearch={false}
            />
          ) : (
            <div className="details w-full flex justify-between">
              <div className="text-2xl font-bricolage text-white">
                {cityInput1} ,
                <span className="text-2xl font-bricolage text-white ">
                  {cityData1.location.country}
                </span>
              </div>

              <button
                className="text-white cursor-pointer "
                onClick={() => handleEdit(setCityData1)}
              >
                <Edit2Icon size={32} />
              </button>
            </div>
          )}
          {loading1 && (
            <>
              <LoaderWeather />
            </>
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
                handleSearch(
                  cityInput2,
                  setCityData2,
                  setCityInput2,
                  setLoading2
                )
              }
              navigateOnSearch={false}
            />
          ) : (
            <div className="details w-full flex justify-between">
              <div className="text-2xl font-bricolage text-white">
                {cityInput2} ,
                <span className="text-2xl font-bricolage text-white ">
                  {cityData2.location.country}
                </span>
              </div>

              <button
                className="text-white cursor-pointer "
                onClick={() => handleEdit(setCityData2)}
              >
                <Edit2Icon size={32} />
              </button>
            </div>
          )}
          {loading2 && (
            <>
              <LoaderWeather />
            </>
          )}
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center mt-8 px-4">
        <button
          className={`font-bold py-3 px-8 rounded-xl shadow-lg transform flex items-center gap-2 transition-all duration-200
            ${
              !cityData1 || !cityData2
                ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white hover:scale-105"
            }`}
          onClick={handleCompare}
        >
          ⚡ Compare Weather
        </button>
      </div>
    </div>
  );
}

export default CompareHome;
