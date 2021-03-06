import React, { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import WeeklyWeather from './weeklyWeather';



const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "your api key";
const iconUrl = "http://openweathermap.org/img/wn/";


const Weather = () => {

    const [weather, setWeather] = useState({});
    const [userInput, setUserInput] = useState();


    const fetchWeatherDetail = (cityName) => {
        if(!cityName) return
        axios
            .get(`${baseUrl}q=${cityName}&appid=${apiKey}`)
            .then((res) => {
                setWeather(res?.data)
            })
            .catch((error) => {
                message.error(error)
            })
    }

    const handleChangeInput = (event) => {
        event.preventDefault();
        setUserInput(event.target.value);
    }

    const handleChange = () => {
        fetchWeatherDetail(userInput)
    }

    return (
        <>
        <div className="weather">
            <input type="text" placeholder="Enter City" className="userInput" value={userInput} onChange={handleChangeInput}/>
            <button type="button" className="search-btn" onClick={handleChange}>Search</button>
        </div>
        {Object.keys(weather).length > 0 &&
            <>
            <div className="weather-result">
                <img src={`${iconUrl}${weather?.weather?.map((item) => item.icon)}@2x.png`} alt="weather-icon"></img>
                <div className="detail">
                    <h3>{weather?.name},&nbsp;&nbsp;{weather?.sys?.country}</h3>
                    <h2>
                        {`${((weather?.main?.temp) - 273.15).toFixed(2)}°C`},&nbsp;&nbsp;&nbsp; 
                        {`${weather?.weather?.map((item) => item.description)}`}
                    </h2>
                    <p>{new Date().toLocaleString()}</p>
                    <h4>
                        Low/High: {((weather?.main?.temp_min) - 273.15).toFixed(2)}/{((weather?.main?.temp_max) - 273.15).toFixed(2)},&nbsp;&nbsp;&nbsp;
                        Humidity: {(weather?.main?.humidity)}%
                    </h4>
                    <h4>
                        Sunrise: {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString()},&nbsp;&nbsp;&nbsp;
                        Sunset: {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString()}
                    </h4>
                    <h4>Wind-speed: {weather?.wind?.speed}</h4>
                </div>
            </div>
            <WeeklyWeather lat={weather?.coord?.lat} lon={weather?.coord?.lon} />
            </>
            }
        </>
    );
};

export default Weather;



