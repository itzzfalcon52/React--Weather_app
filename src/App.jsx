import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UnitsProvider } from "./contexts/UnitsContext";
import { WeatherProvider } from "./contexts/WeatherContext";
import { lazy, Suspense } from "react";
//import SearchWeather from "./pages/SearchWeather";
import Home from "./pages/Home";
import LoaderFullScreen from "./components/LoaderFullScreen";
//import WeatherCompare from "./pages/WeatherCompare";
//import SearchHome from "./pages/SearchHome";
const SearchWeather = lazy(() => import("./pages/SearchWeather"));
const SearchHome = lazy(() => import("./pages/SearchHome"));
const WeatherCompare = lazy(() => import("./pages/WeatherCompare"));

export default function App() {
  return (
    <div className="bg-Neutral-900 h-screen w-screen overflow-auto">
      <UnitsProvider>
        <WeatherProvider>
          <BrowserRouter>
            <Suspense fallback={<LoaderFullScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchHome />} />
                <Route path="/weather" element={<SearchWeather />} />
                <Route path="/compare" element={<WeatherCompare />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </WeatherProvider>
      </UnitsProvider>
    </div>
  );
}
