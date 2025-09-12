import { Link } from "react-router-dom";
import Search from "./Search";

function HomePage({ children }) {
  return (
    // ✅ Empty state when no weather yet
    <>
      <Link to="/">
        <img
          src="/assets/images/Untitled.svg"
          alt="logo"
          className="ml-4 max-sm:w-1/2 max-sm:ml-0 mt-8 cursor-pointer "
        ></img>
      </Link>

      <div className="flex flex-col  mt-24  w-full text-center p-6">
        {children}
      </div>
    </>
  );
}

export default HomePage;
