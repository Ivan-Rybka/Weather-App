import React, { Component } from 'react';
import './style.css'
import thunderstorm from '../../images/icons/thunderstorm.png';
import clouds from '../../images/icons/clouds.png';
import drizzle from '../../images/icons/drizzle.png';
import clear from '../../images/icons/clear.png';
import rain from '../../images/icons/rain.png';
import snow from '../../images/icons/snow.png';
import atmos from '../../images/icons/atmos.png';

export default class ThreeDays extends Component {
    render () {
        const data = Object.values(this.props.threeDays).slice(1, 4)
        return (
            <div id="content-2">
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
                        } else {
                            weatherIcon = clear;
                        }
                        return (
                            <div key={item.day+item.wind*item.pressure} className="threeDaysItem">
                                <div className="threeDaysItem_info">
                                    <h4>{item.day}</h4>
                                    <p>Day: {item.dayTemp}&#8451;</p>
                                    <p>Night: {item.nightTemp}&#8451;</p>
                                    <p>Wind: {item.wind}m/s</p>
                                    <p>Pressure: {item.pressure}</p>
                                    <p>Sunrice: {item.sunrise}</p>
                                    <p>Sunset: {item.sunset}</p>
                                    <p>Moonrice: {item.moonrise}</p>
                                    <p>Moonset: {item.moonset}</p>
                                </div>
                                <div className="threeDaysItem_icon">
                                    <img src={weatherIcon} alt=""/>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
};