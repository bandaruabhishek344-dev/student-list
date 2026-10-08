import React, { useState } from "react";
import axios from "axios";
 
function App() {
  const [weather, setWeather] = useState(null);
 
  const getWeather = () => {
    axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=13.08&longitude=80.27&current_weather=true"
    )
      .then((res) => {
        console.log(res);
        setWeather(res.data.current_weather);
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌦️ Weather App</h1>
 
      <button onClick={getWeather}>Get Weather</button>
 
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <p>🌡️ Temperature: {weather.temperature}°C</p>
          <p>💨 Wind Speed: {weather.windspeed} km/h</p>
          <p>🕒 Time: {weather.time}</p>
        </div>
      )}
    </div>
  );
}
 
export default App;
 