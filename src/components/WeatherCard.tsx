interface WeatherCardProps {
    day: string;
    date: string;
    iconUrl: string;
    description: string;
    avgTemp: string;
    minTemp: string;
    maxTemp: string;
    windSpeed: string;
    conditionType: string; // Add conditionType prop for styling
}

const WeatherCard = ({
    day,
    date,
    iconUrl,
    description,
    avgTemp,
    minTemp,
    maxTemp,
    windSpeed,
    conditionType, // Use conditionType to determine the class
}: WeatherCardProps) => {
    return (
        <div className={`weather-card ${conditionType}`}>
            <div className="weather-card-header">
                <h2>{day}</h2>
                <p>{date}</p>
            </div>
            <div className="weather-card-body">
                <h2 className="temperature">{avgTemp.slice(0, -2)}°C</h2>
                <img src={iconUrl} alt={description} className="weather-icon" />
                <p className="description"><span>{description}</span></p>
                <p className="temperature-hi-lo">lo   {minTemp}°C</p>
                <p className="temperaturehi-lo">hi  {maxTemp}°C</p>
                <p className="wind-speed">wind  {windSpeed} m/s</p>
            </div>
        </div>
    );
}

export default WeatherCard;