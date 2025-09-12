import { UseCompare } from "../contexts/CompareContext";
import WeatherCompareCard from "../components/WeatherCompareCard";
import { useLocation, useNavigate } from "react-router-dom";
import Units from "../components/Units";
import { Link } from "react-router-dom";
import { ListRestartIcon } from "lucide-react"; // or RefreshCw / RefreshCw

function WeatherCompare() {
  const location = useLocation();

  const navigate = useNavigate();

  // Get city data from navigation state
  const cityData1 = location.state?.city1;
  const cityData2 = location.state?.city2;

  return (
    <div className="min-h-screen w-full bg-teal-900 p-8 flex flex-col ">
      {/* Header */}
      <div className="text-center mb-12 ">
        <Link to="/">
          <img
            src="/assets/images/Untitled.svg"
            alt="logo"
            className="ml-4 max-sm:w-1/2 max-sm:ml-0 "
          ></img>
        </Link>
        <h1 className="text-4xl font-bold text-white mb-4">
          Weather Comparison
        </h1>

        <div className="w-24 h-1 bg-teal-300 mx-auto rounded-full"></div>
        <div className="mt-8">
          <Units />
        </div>
      </div>

      <div className="restart  text-white">
        <button className="cursor-pointer" onClick={() => navigate("/compare")}>
          <ListRestartIcon size={48} />
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex-1 flex items-center justify-center max-sm:flex-col">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full max-w-6xl">
          <WeatherCompareCard cityData={cityData1} position="left" />

          {/* VS Divider */}
          <div className="flex items-center justify-center lg:mx-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-white text-xl font-bold">VS</span>
            </div>
          </div>

          <WeatherCompareCard cityData={cityData2} position="right" />
        </div>
      </div>
    </div>
  );
}

export default WeatherCompare;
