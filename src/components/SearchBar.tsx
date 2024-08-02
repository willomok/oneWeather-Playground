import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (city: string) => void; 
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value); 
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div id="navbar">
            <h1 id="navbar-title">oneWeather</h1>
            <div id="search-container">
                <input 
                    id="searchbar"
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter city name..."
                />
                <button 
                    id="searchbutton"
                    onClick={handleSearch}>Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
