import Search from "../components/Search";
import { Link } from "react-router-dom";

function SearchHome() {
  return (
    // ✅ Empty state when no weather yet
    <>
      <Link to="/">
        <img
          src="/assets/images/logo-dark.svg"
          alt="logo"
          className="ml-4 max-sm:w-1/2 max-sm:ml-0 mt-8  "
        ></img>
      </Link>

      <div className="flex flex-col  mt-24 h-screen w-full text-center p-6">
        <h2 className="text-5xl font-bold text-white mb-4 sm:text=3xl">
          🌤️ Welcome to Weather Now
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Search for a city to get the latest weather updates.
        </p>
        <Search />
      </div>
    </>
  );
}

export default SearchHome;
