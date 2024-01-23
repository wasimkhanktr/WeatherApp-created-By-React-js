import { useEffect, useState } from "react";
import "../Weather App/weatherApp.css";
import { useNavigate } from "react-router-dom";

const WeatherApp = () => {
  const api_key = "4e4d4fcb9eaf47738d0112645241801";
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [element, setElement] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setElement(value);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSuggestions([]);
          return;
        }

        const url = `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${searchTerm}`;
        const response = await fetch(url);
        const data = await response.json();

        setSuggestions(data.map((location) => location.name));
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, api_key]);

  const handleSuggestionClick = (selectedLocation) => {
    setSearchTerm("");
    setSuggestions([]);
    setElement(selectedLocation);
    navigate("/today", { replace: true, state: { element } });
  };

  return (
    <div className="container">
      <div className="top-bar">

      <form onSubmit={handleSuggestionClick}>
        <div className="top-bar">
          <input
            className="cityInput"
            autoComplete="off"
            placeholder="Search the location"
            type="text"
            name=""
            id=""
            value={searchTerm}
            onChange={handleInputChange}
          />
          <input
            className="search-icon"
            type="submit"
            value=""
          />
        </div>
      </form>

        <div className="suggestions">
          {suggestions.map((location, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(location)}
            >
              {location}
            </div>
          ))}
        </div>
      </div>
      <div className="welcome-container">
        <h1>Welcome to Your Weather App</h1>
        <p>Check the current weather and forecast for your location.</p>
      </div>
      <div className="copyright-container">
      <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved by @WK. Powered by Weather App.</p>
    </div>
    </div>
  );
};

export default WeatherApp;
