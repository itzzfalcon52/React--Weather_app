import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UnitsProvider } from "./contexts/UnitsContext";
import { WeatherProvider } from "./contexts/WeatherContext";
import SearchWeather from "./pages/SearchWeather";
import Home from "./pages/Home";
import WeatherCompare from "./pages/WeatherCompare";

export default function App() {
  return (
    <div className="bg-Neutral-900 h-screen w-screen overflow-auto">
      <UnitsProvider>
        <WeatherProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchWeather />} />
              <Route path="/compare" element={<WeatherCompare />} />
            </Routes>
          </BrowserRouter>
        </WeatherProvider>
      </UnitsProvider>
    </div>
  );
}
