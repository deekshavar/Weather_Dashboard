import React from 'react';

const Favorites = ({ favorites, removeFromFavorites, fetchWeather }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Favorite Cities</h2>
      <ul className="bg-gray-100 rounded-lg p-4 mt-2 shadow-lg">
        {favorites.length > 0 ? (
          favorites.map((city, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
              <span className="cursor-pointer text-blue-600 hover:underline" onClick={() => fetchWeather(city)}>{city}</span>
              <button onClick={() => removeFromFavorites(city)} className="text-red-500 hover:text-red-600">Remove</button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No favorite cities yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Favorites;
