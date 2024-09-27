interface WeatherCardProps {
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

const WeatherCard = ({
    day,
    date,
    iconUrl,
    description,
    avgTemp,
    minTemp,
    maxTemp,
    windSpeed,
    conditionType, 
}: WeatherCardProps) => {
    return (
        <div className={`weather-card ${conditionType}`}>
            <div className="weather-card-header">
                <h2>{day}</h2>
                <p>{date}</p>
            </div>
            <div className="weather-card-body">
                <h2 className="temperature">{avgTemp.slice(0, -2)}°c</h2>
                <img src={iconUrl} alt={description} className="weather-icon" />
                <p className="description"><span>{description}</span></p>
                <p className="temperature-hi-lo">lo   {minTemp}°c</p>
                <p className="temperaturehi-lo">hi  {maxTemp}°c</p>
                <p className="wind-speed">wind  {windSpeed} m/s</p>
            </div>
        </div>
    );
};

export default WeatherCard;