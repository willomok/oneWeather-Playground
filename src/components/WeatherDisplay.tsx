import { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { fetchWeatherData } from '../services/weatherService';

function WeatherDisplay() {
    const [weatherCards, setWeatherCards] = useState<any[]>([]);
    const [city, setCity] = useState('Manchester'); // Default city
    const [error, setError] = useState<string | null>(null); // State to store error message

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

    const handleSearch = async (searchedCity: string) => {
        try {
            const data = await fetchWeatherData(searchedCity); // Attempt to fetch weather data for the new city
            setWeatherCards(data); // If successful, update the weather data
            setCity(searchedCity); // Only update the city if the fetch was successful
        } catch (error) {
            console.error('Failed to fetch weather data for searched city:', error);
            setError('Please enter a correct city name');
        }
    };

    return (
        <div className="weather-display">
            <SearchBar onSearch={handleSearch} />
            {error && <p className="error-message">{error}</p>}
            {city && <h1 className="city-name">{city}</h1>}
            <div className="weather-cards-container">
                {weatherCards.map((dayData, index) => (
                    <WeatherCard key={index} {...dayData}  day={index === 0 ? 'Today' : dayData.day} />
                ))}
            </div>
        </div>
    );
}

export default WeatherDisplay;
