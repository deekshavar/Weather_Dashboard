import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import Favorites from '../Favorites';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    const apiKey = 'ebbdad880bd5b9bcd0a2e4c1f59c2435'; // Use your actual API key here
    try {
      // Fetch current weather data
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      // Check response status for current weather
      if (!currentWeatherResponse.ok) {
        const errorData = await currentWeatherResponse.json();
        throw new Error(errorData.message || 'Failed to fetch current weather data');
      }

      // Parse current weather response
      const currentWeather = await currentWeatherResponse.json();
      console.log('Current Weather:', currentWeather); // Log the fetched data

      // Extract latitude and longitude from current weather data
      const { lat, lon } = currentWeather.coord;

      // Fetch 5-day forecast data using latitude and longitude
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

      // Check response status for forecast
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }

      // Parse forecast response
      const forecast = await forecastResponse.json();
      console.log('Forecast:', forecast); // Log the fetched data

      // Update state with weather data
      setWeatherData({ currentWeather, forecast });
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message); // Set error message in state
      setWeatherData(null); // Clear weather data on error
    }
  };

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to local storage
    }
  };

  const removeFromFavorites = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save updated list to local storage
  };

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    loadFavorites(); // Load favorites from local storage on mount
  }, []);

  return (
    <div className="mt-4">
      <SearchBar fetchWeather={fetchWeather} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} addToFavorites={addToFavorites} />}
      <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} fetchWeather={fetchWeather} />
    </div>
  );
};

export default WeatherDashboard;
