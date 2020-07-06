import React, { useState } from 'react';
const api ={
    key: "0b7c305e5db47009211ac6cf46717c0f",
    base: "https://api.openweathermap.org/data/2.5/"


}

function WeatherSearch() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    let input;
    

  function cityCheck(city){
         if(city.toUpperCase() === "gpf".toUpperCase()){
            setCity('cairo') 
            return city;           
        }
        else if(city.toUpperCase() === "georgia practice facility".toUpperCase()){
            setCity('cairo') 
            return city;          
        }
        else{
            setCity(city)
             return city;
        }
       
        
    }

    const search = evt => {
      if (evt.key === "Enter") {        
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)  
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setCity('');
            console.log(result);
          });
      }
    }
  
    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date} ${month} ${year}`
    }

    
  
    return (
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 45) ? 'app warm' : 'app') : 'app'}>
        <main>
            <div className="title"><h1>MotoForecaster</h1></div>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Enter city name"
              onChange={e => cityCheck(e.target.value)}
              value={input}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(((weather.main.temp) / 5) * 9) + 32}°F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          ) : ('')}
        </main>
      </div>
    );
  }
  
  export default WeatherSearch;