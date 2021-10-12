import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const URL = `${WEATHER_API_URL}/weather?q=${capital}&appid=${WEATHER_API_KEY}&units=metric`;

  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    axios.get(URL).then(({ data }) => {
      const info = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        wind: data.wind.speed,
      };
      setWeatherInfo(info);
    });
  }, [URL]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>Temperature: </strong>
        {weatherInfo.temperature} ºC
      </p>

      <p>
        <strong>Description: </strong>
        {weatherInfo.description}
      </p>

      <p>
        <strong>Wind: </strong>
        {weatherInfo.wind} m/s
      </p>
    </div>
  );
};
export default Weather;
