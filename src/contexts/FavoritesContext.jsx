import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  // 🟢 Lazy initializer: directly read from localStorage once
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [isAdded, setIsAdded] = useState(false);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorites(city) {
    if (!favorites.find((c) => c.location.name === city.location.name)) {
      setFavorites([...favorites, city]);
      setIsAdded(true); // ✅ show success message

      // reset flag after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    }
  }

  function deleteFavorites(city) {
    setFavorites(
      favorites.filter((c) => c.location?.name !== city.location?.name)
    );
  }

  function isFavorite(name) {
    return favorites.some((c) => c.location.name === name);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorites, deleteFavorites, isFavorite, isAdded }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function UseFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined)
    throw new Error("context was used outside the FavoritesProvider");
  return context;
}

export { FavoritesProvider, UseFavorites };
