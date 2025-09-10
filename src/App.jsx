import Header from "./components/Header";
import Search from "./components/Search";
import Main from "./components/Main";
import { UnitsProvider } from "./contexts/UnitsContext";
import Units from "./components/Units";
import { WeatherProvider } from "./contexts/WeatherContext";

export default function App() {
  return (
    <div className="bg-Neutral-900 h-screen w-screen overflow-auto">
      <UnitsProvider>
        <WeatherProvider>
          <Header>
            <Units />
          </Header>
          <Search />
          <Main />
        </WeatherProvider>
      </UnitsProvider>
    </div>
  );
}
