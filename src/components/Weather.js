import React, { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';




const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "your api key";

const Weather = () => {

    const [data, setData] = useState({});
    const [userInput, setUserInput] = useState('');


    const fetchWeatherDetail = (cityName) => {
        if(!cityName) return
        axios
            .get(`${baseUrl}q=${cityName}&appid=${apiKey}`)
            .then((res) => {
                setData(res?.data)
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
        {Object.keys(data).length > 0 &&
            <div className="weather-result">
                <img src={`http://openweathermap.org/img/wn/${data?.weather?.map((item) => item.icon)}@2x.png`} alt="weather-icon"></img>
                <div className="detail">
                    <h3>{data?.name},&nbsp;&nbsp;{data?.sys?.country}</h3>
                    <h2>
                        {`${((data?.main?.temp) - 273.15).toFixed(2)}°C`},&nbsp;&nbsp;&nbsp; 
                        {`${data?.weather?.map((item) => item.main)}`}
                    </h2>
                    <p>{new Date().toLocaleString()}</p>
                    <h4>
                        Low/High: {((data?.main?.temp_min) - 273.15).toFixed(2)}/{((data?.main?.temp_max) - 273.15).toFixed(2)},&nbsp;&nbsp;&nbsp;
                        Humidity: {(data?.main?.humidity)}
                    </h4>
                    <h4>
                        Sunrise: {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()},&nbsp;&nbsp;&nbsp;
                        Sunset: {new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}
                    </h4>
                </div>
            </div>
        }
        </>
    );
};

export default Weather;



