import React, { Component } from 'react';
import './style.css';
import thunderstorm from '../../images/icons/thunderstormMin.png';
import clouds from '../../images/icons/cloudsMin.png';
import drizzle from '../../images/icons/drizzleMin.png';
import clear from '../../images/icons/clearMin.png';
import rain from '../../images/icons/rainMin.png';
import snow from '../../images/icons/snowMin.png';
import atmos from '../../images/icons/atmosMin.png';
import moon from '../../images/icons/moon.png';

export default class Hourly extends Component {
    render () {
        const data = this.props.hourly;
        return (
            <div id="content-1">
                {
                    data?.map((item) => {
                        let weatherIcon = '';
                        if (item.weatherId < 299) {
                            weatherIcon = thunderstorm;
                        } else if (item.weatherId > 299 && item.weatherId < 450) {
                            weatherIcon = drizzle;
                        } else if (item.weatherId > 499 && item.weatherId < 550) {
                            weatherIcon = rain;
                        } else if (item.weatherId > 599 && item.weatherId < 650) {
                            weatherIcon = snow;
                        } else if (item.weatherId > 700 && item.weatherId < 790) {
                            weatherIcon = atmos;
                        } else if (item.weatherId > 800) {
                            weatherIcon = clouds;
                        } else if (item.time > 7 && item.time < 19) {
                                weatherIcon = clear;
                        } else {weatherIcon = moon;}
                        return (
                            <div key={item.time+item.clouds*item.feels} className="hourlyItem">
                                <h4>{item.time}:00</h4>
                                <p className="temperature">{(item.temp > 0) ? `+${item.temp}` : `${item.temp}`}&#8451;</p>
                                <div className="hourlyItem_weather">
                                    <img src={weatherIcon} alt=""/>
                                    <p>{item.weather}</p>
                                </div>
                                <p>Feeling like:<br/>{(item.feels > 0) ? `+${item.feels}` : `${item.feels}`}&#8451;</p>
                                <p>Wind: <br/> {item.wind}m/s</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    };
}

