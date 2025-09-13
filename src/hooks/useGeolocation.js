import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) {
      const errMsg = "Your browser does not support geolocation";
      setError(errMsg);
      return Promise.reject(new Error(errMsg));
    }

    setIsLoading(true);

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setPosition(coords);
          setIsLoading(false);
          resolve(coords);
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
          reject(err);
        },
        {
          enableHighAccuracy: true, // ✅ new options
          timeout: 10000, // ✅ 10s timeout
          maximumAge: 0, // ✅ don’t use cached values
        }
      );
    });
  }

  return { isLoading, position, error, getPosition };
}
