import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

const apiKey = "49d65f3e3cd6a2a73473bcfc10a0a319";
const units = "metric";

export default function SearchEngine() {
  const [city, setCity] = useState(null);
  const [resultSearch, setResultSearch] = useState("");

  function showTemperature(response) {
    setResultSearch(
      <div>
        <p>It is Currently in {city}:</p>
        <ul>
          <li>Temperature: {Math.round(response.data.main.temp)}˚C</li>
          <li>Description: {response.data.weather[0].description}</li>
          <li>Humidity: {response.data.main.humidity}%</li>
          <li>Wind: {Math.round(response.data.wind.speed)} mph</li>
          <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color="goldenrod"
            size={48}
            animate={true}
          />
        </ul>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showTemperature);
  }

  function changeCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a City"
          autoFocus={true}
          onChange={changeCity}
        />
        <input type="submit" value="Search" />
      </form>
      <h2>{resultSearch}</h2>
    </div>
  );
}