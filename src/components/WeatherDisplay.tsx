import { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { fetchWeatherData } from '../services/weatherService';

function WeatherDisplay() {
    const [weatherCards, setWeatherCards] = useState<any[]>([]);
    const [city, setCity] = useState('Manchester');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await fetchWeatherData(city);
                setWeatherCards(data);
                setError(null);
            } catch {
                setError('Failed to load weather data');
            }
        };
        fetchWeather();
    }, [city]);

    const handleSearch = async (searchedCity: string) => {
        try {
            const data = await fetchWeatherData(searchedCity);
            setWeatherCards(data);
            setCity(searchedCity);
            setError(null);
        } catch {
            setError('Please enter a correct city name');
        }
    };

    return (
        <div className="weather-display">
            <SearchBar onSearch={handleSearch} />
            {error && <p className="error-message">{error}</p>}
            <h1 className="city-name">
                {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
            </h1>
            <div className="weather-cards-container">
                {weatherCards.map((dayData, index) => (
                    <WeatherCard
                        key={index}
                        {...dayData}
                        day={index === 0 ? 'Today' : dayData.day}
                    />
                ))}
            </div>
        </div>
    );
}

export default WeatherDisplay;