import React from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-indigo-500 min-h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Weather Dashboard</h1>
       <Weather/>
      </div>
    </div>
  );
}

export default App;
