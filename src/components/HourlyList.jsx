function handleTime(timeISO) {
  const date = new Date(timeISO);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // 👈 ensures AM/PM format
  });
}
function getWeatherEmoji(code) {
  if (code === 0)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-sunny.webp"
        alt="sunny"
      />
    ); // Clear sky

  if (code === 1 || code === 2)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-partly-cloudy.webp"
        alt="partly-cloudy"
      />
    ); // Mainly clear / partly cloudy
  if (code === 3)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-overcast.webp"
        alt="partly-cloudy"
      />
    ); // Overcast

  if (code === 45 || code === 48)
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-fog.webp"
        alt="fog"
      />
    ); // Fog / depositing rime fog

  if ([51, 53, 55, 56, 57].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-drizzle.webp"
        alt="drizzle"
      />
    ); // Drizzle / freezing drizzle
  if ([61, 63, 65, 66, 67].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-rain.webp"
        alt="rain"
      />
    ); // Rain / freezing rain
  if ([71, 73, 75, 77].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-snow.webp"
        alt="sunny"
      />
    ); // Snow fall / grains
  if ([80, 81, 82].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-rain.webp"
        alt="rain"
      />
    ); // Rain showers
  if ([85, 86].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-snow.webp"
        alt="snow"
      />
    ); // Snow showers

  if ([95].includes(code))
    return (
      <img
        className="w-full h-full"
        src="/assets/images/icon-storm.webp"
        alt="storm"
      />
    ); // Thunderstorm (slight/moderate)
  if ([96, 99].includes(code))
    <img
      className="w-full h-full"
      src="/assets/images/icon-storm.webp"
      alt="storm"
    />; // Thunderstorm with hail

  return "❓"; // Unknown
}

function HourlyList({ temp, weatherCode, time }) {
  return (
    <li className="flex justify-between items-center h-full bg-gray-800 rounded-md mb-2 mx-2">
      <span className="h-full w-full flex-1">
        {getWeatherEmoji(weatherCode)}
      </span>
      <span className="flex-2 font-bricolage text-white ">
        {handleTime(time)}
      </span>
      <span className="flex-1 font-bricolage text-xl text-white">{temp}</span>
    </li>
  );
}

export default HourlyList;
