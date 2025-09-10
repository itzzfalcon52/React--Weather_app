import { useState } from "react";
import { UseWeather } from "../contexts/WeatherContext";
import HourlyList from "./HourlyList";

function findingDay(iSOString) {
  //console.log(iSOString);
  const date = new Date(iSOString);
  //console.log(date);
  const days = [
    "Sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function getNextDayISO(dayISO) {
  if (!dayISO) return null; // handle empty string or undefined
  const date = new Date(dayISO);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10); // yyyy-mm-dd
}

function HourlyForecast() {
  const { weather, loading, convertedWeather } = UseWeather();

  //if (!weather || loading || error) return null;

  const today = weather?.current?.time.slice(0, 10) || "";
  const [day, setDay] = useState(today || "");

  //if (!day) return null;
  const nextDay = getNextDayISO(day);

  const dayStartIndex = weather?.hourly?.time.findIndex((time) =>
    time.startsWith(day)
  );
  const dayEndIndex = weather?.hourly?.time.findIndex((t) =>
    t.startsWith(nextDay)
  );

  const hourlyTempsForDay = convertedWeather?.hourly?.temperature_2m.slice(
    dayStartIndex,
    dayEndIndex === -1 ? undefined : dayEndIndex // if last day, take till end
  );

  const hourlyCodesForDay = weather?.hourly?.weathercode.slice(
    dayStartIndex,
    dayEndIndex === -1 ? undefined : dayEndIndex
  );
  const hourlyTimesForDay = weather?.hourly?.time.slice(
    dayStartIndex,
    dayEndIndex === -1 ? undefined : dayEndIndex
  );

  return (
    <div className="bg-gray-700 col-start-6 col-end-8 row-span-5 -translate-x-28 h-full max-sm:translate-x-0 max-sm:h-128 max-sm:p-2 max-sm:mb-24">
      <div className="container flex flex-col min-h-0 h-full ">
        <div className="header p-2 flex justify-between items-center  shrink-0">
          <p className="text-xl text-white font-bricolage font-bold">
            Hourly Forecasts
          </p>
          <select
            name="days"
            className="text-white bg-gray-800 p-2 rounded-md"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {weather ? (
              weather?.daily.time.map((day) => (
                <option className="" key={day} value={day}>
                  {findingDay(day)}
                </option>
              ))
            ) : (
              <option>-</option>
            )}
          </select>
        </div>
        {loading && (
          <ul className="content flex flex-col flex-1    pr-2 items-stretch ">
            {Array.from({ length: 7 }).map((_, i) => (
              <li
                className=" flex-1 p-10  bg-gray-800 rounded-md mb-2 mx-2 animate-pulse"
                key={i}
              ></li>
            ))}
          </ul>
        )}
        <ul className="content flex flex-col  flex-1 overflow-y-auto pr-2">
          {hourlyTempsForDay?.map((temp, i) => (
            <HourlyList
              key={i}
              temp={temp}
              weatherCode={hourlyCodesForDay[i]}
              time={hourlyTimesForDay[i]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HourlyForecast;
