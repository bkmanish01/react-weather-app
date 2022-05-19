import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import axios from 'axios';




// url for weekly forcast
const url = "https://api.openweathermap.org/data/2.5/onecall?";
const apiKey = "your api key";
const iconUrl = "http://openweathermap.org/img/wn/";

const WeeklyWeather = ({lat, lon}) => {

    const [weeks, setWeeks] = useState({});
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const getWeeklyWeather = () => {
        axios
        .get(`${url}lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
        .then((res) => {
            setWeeks(res?.data)
        })
        .catch((error) => {
            message.error(error)
        })
    };

    useEffect(() => {
        getWeeklyWeather()
    }, []);

    return (
        <>
        <div className="weekly-result">
            {
                weeks?.daily?.map(item => 
                    <div className="day">
                        <h2>{days[(Math.floor(item.dt / 86400 / 1000) + 4) % 7]}</h2>
                        <img src={`${iconUrl}${item.icon}@2x.png`} alt="weather-icon"></img>
                        <p>
                            {`${((item.temp.day) - 273.15).toFixed(2)}°C`},&nbsp;&nbsp;&nbsp;
                            {`${item.map((value) => value.main)}`}
                        </p>
                        <p>
                            Sunrise: {new Date(item.sunrise * 1000).toLocaleTimeString()},&nbsp;&nbsp;
                            Sunset: {new Date(item.sunset * 1000).toLocaleTimeString()}
                        </p>  
                        <p>Humidity: {(item.humidity)}%</p>
                    </div>
                )
            }
        </div>
        </>
    );
};

export default WeeklyWeather;

