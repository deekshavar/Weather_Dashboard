import React, { useState, useEffect } from 'react';

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = 'ebbdad880bd5b9bcd0a2e4c1f59c2435'; 

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
      setCity(''); 
      setSuggestions([]); 
    }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.list) {
          setSuggestions(data.list); 
        }
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = (cityName) => {
    fetchWeather(cityName);
    setCity(''); 
    setSuggestions([]); 
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          value={city}
          onChange={handleSearchChange}
          placeholder="Enter city name"
          className="border border-gray-300 rounded-l px-4 py-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Search
        </button>
      </form>

      {/* Loading state */}
      {loading && <div className="absolute top-full left-0 w-full p-2 text-gray-500">Loading...</div>}

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-b z-10 shadow-lg">
          {suggestions.map((city) => (
            <li
              key={city.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectCity(city.name)}
            >
              {city.name}, {city.sys.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
