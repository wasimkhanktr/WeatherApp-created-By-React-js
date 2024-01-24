import { useEffect, useState } from "react";
import "../Weather App/weatherApp.css";
import { useLocation, useNavigate } from "react-router-dom";
const Week = () => {
  const locations = useLocation();
  const forecastDatas =locations.state.day;
  const [forecastData, setForecastData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(forecastDatas);
  console.log("week data")
  console.log(selectedDay)

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleDayClick = (day,index) => {
    setSelectedDayIndex(index);
    setSelectedDay(day);
  };
  const element = locations.state.element;

  const api_key = "4e4d4fcb9eaf47738d0112645241801";

  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      try {
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${element}&days=9&aqi=no&alerts=no`;
        let response = await fetch(url);
        let data = await response.json();
        setForecastData(data.forecast.forecastday);

        let surl = `https://api.weatherapi.com/v1/sports.json?key=${api_key}&q=${element}`;
        let sresponse = await fetch(surl);
        let sdata = await sresponse.json();
        setSportData(sdata.football);

        const location = document.getElementsByClassName("weather-location");
        const region = document.getElementsByClassName("region");
        const country = document.getElementsByClassName("country");

        location[0].innerHTML = data.location.name;
        region[0].innerHTML = "Region : " + data.location.region;
        country[0].innerHTML = "Country : " + data.location.country;
      } catch (err) {
        navigate("/erorr");
      }
    };
    search();
  }, [element, navigate]);

  const getDayName = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };


  return (
    <div className="container">
      <div className="nav">
        <button onClick={() => {
              navigate("/")}}>goto home</button>
      </div>

      <div className="weather-location">City Name</div>
      <div className="region">region</div>
      <div className="country">country</div>

      <div className="forcast">
        <h1>Forecast</h1>
        <button onClick={() => {navigate("/today", { replace: true, state: { element } })}}>Today</button>
        <button id="today"
            onClick={() => {navigate("/week", { replace: true, state: { element } })}}>Next 9 days</button>
      </div>

      <div>
        <div  className="day">
          {forecastData.map((day,index) => (
            <div  
              key={day.date_epoch}
              style={{backgroundColor: index === selectedDayIndex ? 'rgb(4,243,131)' : 'white'}}
              className={`days ${selectedDay === day ? "selected" : ""} ${selectedDayIndex === index ? 'selected' : ''}`}
              onClick={() => handleDayClick(day,index)}
            >
              <img src={day.day.condition.icon} alt="" />
              <p>{getDayName(day.date)}</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
        
        {selectedDay && (
          
          <div className="selected-day-info">
            <div className="weather-temp">{selectedDay.day.avgtemp_c} °c</div>
            <div className="max_temp">
              Max Temp : {selectedDay.day.maxtemp_c} °C
            </div>
            <div className="min_temp">
              Min Temp : {selectedDay.day.mintemp_c} °C
            </div>
            <div className="direction_wind">
              Wind direction :{selectedDay.hour[1].wind_dir} kph
            </div>
            <div className="rain">
              Chances of Rain ? : {selectedDay.hour[1].chance_of_rain} %
            </div>
            <div className="visibility">
              Visibility : {selectedDay.hour[1].vis_km} km
            </div>
          </div>
        )}
      </div>

      <div className="sport">
        <h1>Sport in Your Vicinity</h1>
        <p>plan your trip accordingly</p>
        <h1>Football</h1>

        <div className="sports">
          {sportData.slice(0, 3).map((match, index) => (
            <div key={index} className="football-match">
              <p>Tournament : {match.tournament}</p>
              <p>Stadium : {match.stadium}</p>
              <p>{match.match}</p>
              <p className="start">{match.start}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="copyright-container">
     <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved by @WK❤ Powered by Weather App.</p>
    </div>
    </div>
  );
};

export default Week;
