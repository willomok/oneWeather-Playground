import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

interface WeatherData {
    day: string;
    date: string;
    iconUrl: string;
    description: string;
    avgTemp: string;
    minTemp: string;
    maxTemp: string;
    windSpeed: string;
    conditionType: string;
}

interface WeatherApiResponse {
    list: {
        dt_txt: string;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        weather: {
            icon: string;
            description: string;
            main: string;
        }[];
        wind: {
            speed: number;
        };
    }[];
}

export const fetchWeatherData = async (city: string): Promise<WeatherData[]> => {
    try {
        const response = await axios.get<WeatherApiResponse>(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });

        const data = response.data;

        // Group weather data by day
        const dailyData: Record<string, any[]> = data.list.reduce((acc: Record<string, any[]>, curr) => {
            const date = curr.dt_txt.split(' ')[0]; // Extract the date part
            if (!acc[date]) acc[date] = [];
            acc[date].push(curr);
            return acc;
        }, {});

        // Process each day's data
        const weatherCards = Object.keys(dailyData).map((date) => {
            const dayData = dailyData[date];

            // Calculate average temperature, min, max, and wind speed
            const avgTemp = dayData.reduce((sum: number, item) => sum + item.main.temp, 0) / dayData.length;
            const minTemp = Math.min(...dayData.map((item) => item.main.temp_min));
            const maxTemp = Math.max(...dayData.map((item) => item.main.temp_max));
            const windSpeed = dayData.reduce((sum: number, item) => sum + item.wind.speed, 0) / dayData.length;

            // Use the first weather entry of the day for the icon and description
            const { icon, description, main } = dayData[0].weather[0];
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // Assign a condition type based on the main weather condition
            let conditionType = '';
            switch (main) {
                case 'Rain':
                    conditionType = 'rainy';
                    break;
                case 'Clear':
                    conditionType = 'sunny';
                    break;
                case 'Clouds':
                    conditionType = 'cloudy';
                    break;
                case 'Snow':
                    conditionType = 'snowy';
                    break;
                case 'Drizzle':
                    conditionType = 'drizzly';
                    break;
                case 'Thunderstorm':
                    conditionType = 'stormy';
                    break;
                default:
                    conditionType = 'default';
            }

            return {
                day: new Date(date).toLocaleDateString('en-GB', { weekday: 'long' }),
                date: new Date(date).toLocaleDateString('en-GB'),
                iconUrl,
                description,
                avgTemp: avgTemp.toFixed(1),
                minTemp: minTemp.toFixed(1),
                maxTemp: maxTemp.toFixed(1),
                windSpeed: windSpeed.toFixed(1),
                conditionType, // Include the condition type
            };
        });

        return weatherCards;

    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};