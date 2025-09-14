import { UseFavorites } from "../contexts/FavoritesContext";
import FavoriteCity from "./FavoriteCity";

function FavoritesList() {
  const { favorites, deleteFavorites, isFavorite } = UseFavorites();

  return (
    <div className="bg-slate-700 p-4">
      <div className="header">
        <p className="text-2xl text-white font-bricolage font-semibold">
          Your Favorites❤️
        </p>
      </div>
      {favorites.length === 0 && (
        <div className="text-white text-lg font-bricolage flex justify-center items-center max-sm:flex-col">
          Start adding ctites to your favorites by clicking on add to
          favorites..
        </div>
      )}
      <ul className="flex flex-col justify-between items-center ">
        {favorites.map((cityObj, i) => (
          <FavoriteCity
            cityObj={cityObj}
            isFavorite={isFavorite}
            deleteFavorites={deleteFavorites}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
