
import { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { fetchWeatherData } from '../services/weatherService';

function WeatherDisplay() {
    const [weatherCards, setWeatherCards] = useState<any[]>([]);
    const [city, setCity] = useState('Manchester'); // Default city

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await fetchWeatherData(city); // Fetch based on the current city
                setWeatherCards(data);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };

        fetchWeather().catch(error => console.error(error));
    }, [city]); // Refetch weather data when the city changes

    const handleSearch = (searchedCity: string) => {
        setCity(searchedCity); // Update the city to the searched value
    };

    return (
        <div className="weather-display">
        <SearchBar onSearch={handleSearch} />
        {city && <h1 className="city-name">{city}</h1>}
        <div className="weather-cards-container">
          {weatherCards.map((dayData, index) => (
            <WeatherCard key={index} {...dayData} />
          ))}
        </div>
      </div>
        
    );
}

export default WeatherDisplay;

