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

const conditionTypeMap: Record<string, string> = {
    Rain: 'rainy',
    Clear: 'sunny',
    Clouds: 'cloudy',
    Snow: 'snowy',
    Drizzle: 'drizzly',
    Thunderstorm: 'stormy',
    default: 'default',
};

export const fetchWeatherData = async (city: string): Promise<WeatherData[]> => {
    try {
        const { data } = await axios.get<WeatherApiResponse>(BASE_URL, {
            params: { q: city, appid: API_KEY, units: 'metric' },
        });

        const dailyData = data.list.reduce((acc, curr) => {
            const date = curr.dt_txt.split(' ')[0];
            acc[date] = [...(acc[date] || []), curr];
            return acc;
        }, {} as Record<string, typeof data.list>);

        return Object.entries(dailyData).map(([date, dayData]) => {
            const temps = dayData.map(({ main }) => main);
            const avgTemp = (temps.reduce((sum, { temp }) => sum + temp, 0) / temps.length).toFixed(1);
            const minTemp = Math.min(...temps.map(t => t.temp_min)).toFixed(1);
            const maxTemp = Math.max(...temps.map(t => t.temp_max)).toFixed(1);
            const windSpeed = (dayData.reduce((sum, { wind }) => sum + wind.speed, 0) / dayData.length).toFixed(1);
            const { icon, description, main } = dayData[0].weather[0];
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const conditionType = conditionTypeMap[main] || conditionTypeMap.default;

            return {
                day: new Date(date).toLocaleDateString('en-GB', { weekday: 'long' }),
                date: new Date(date).toLocaleDateString('en-GB'),
                iconUrl,
                description,
                avgTemp,
                minTemp,
                maxTemp,
                windSpeed,
                conditionType,
            };
        });
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err.response?.data?.message || 'Failed to fetch weather data';
        } else {
            throw 'An unexpected error occurred';
        }
    }
};