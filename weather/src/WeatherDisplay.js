import React from 'react';
import { WbSunny, Cloud, Grain, AcUnit, Thunderstorm } from '@mui/icons-material';

const WeatherDisplay = ({ data, addToFavorites }) => {
  const { currentWeather, forecast } = data;

  // Extract and process daily forecast data
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0]; // Extract date from timestamp
    if (!acc[date]) acc[date] = []; // Initialize array if date doesn't exist
    acc[date].push(item); // Push forecast item into the date array
    return acc;
  }, {});

  // Helper function to get the appropriate weather icon based on description
  const getWeatherIcon = (description) => {
    switch (description) {
      case 'clear sky':
        return <WbSunny className="text-yellow-500" />;
      case 'clouds':
        return <Cloud className="text-gray-500" />;
      case 'snow':
        return <AcUnit className="text-blue-300" />;
      case 'rain':
        return <Grain className="text-blue-400" />;
      case 'thunderstorm':
        return <Thunderstorm className="text-gray-700" />;
      default:
        return <Cloud className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mt-4">
      <h2 className="text-2xl font-bold text-center">Current Weather</h2>
      <div className="flex items-center justify-center mt-4">
        <h3 className="text-xl">{currentWeather.name}</h3>
        {/* Add to Favorites button */}
        <button
          onClick={() => addToFavorites(currentWeather.name)}
          className="bg-green-500 text-white rounded px-4 py-2 ml-4 hover:bg-blue-600"
        >
          Add to Favorites
        </button>
      </div>

      <div className="text-center mt-4">
        {getWeatherIcon(currentWeather.weather[0].description)} {/* Weather icon */}
        <p className="text-lg">{Math.round(currentWeather.main.temp)}°C, {currentWeather.weather[0].description}</p>
      </div>

      <h3 className="text-2xl font-bold mt-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.entries(dailyForecast).map(([date, items]) => {
          const avgTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length; // Average temperature for the day
          return (
            <div key={date} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold">{new Date(date).toLocaleDateString()}</h4>
              <div className="flex items-center justify-center">
                {getWeatherIcon(items[0].weather[0].description)} {/* Weather icon for the forecast */}
                <p>{Math.round(avgTemp)}°C</p>
              </div>
              <p>{items[0].weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDisplay;
