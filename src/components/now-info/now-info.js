import React, { Component } from 'react';
import './style.css';
import thunderstorm from '../../images/icons/thunderstorm.png';
import clouds from '../../images/icons/clouds.png';
import drizzle from '../../images/icons/drizzle.png';
import clear from '../../images/icons/clear.png';
import rain from '../../images/icons/rain.png';
import snow from '../../images/icons/snow.png';
import atmos from '../../images/icons/atmos.png';
import clearNight from '../../images/icons/clearNight.png';
import cloudsNight from '../../images/icons/cloudsNight.png';

export default class NпёowInfo extends Component {

    render() {
        const conds = this.props.conds;
        let windDir = '';
        if (conds.windDeg > 45 && conds.windDeg < 67) {
            windDir = 'northeast';
        } else if (conds.windDeg > 68 && conds.windDeg < 112) {
            windDir = 'east';
        } else if (conds.windDeg > 113 && conds.windDeg < 157) {
            windDir = 'southeast';
        } else if (conds.windDeg > 158 && conds.windDeg < 202) {
            windDir = 'south';
        } else if (conds.windDeg > 203 && conds.windDeg < 247) {
            windDir = 'southwest';
        } else if (conds.windDeg > 248 && conds.windDeg < 292) {
            windDir = 'west';
        } else if (conds.windDeg > 293 && conds.windDeg < 337) {
            windDir = 'northwest';
        } else {
            windDir = 'north';
        }
        let weatherIcon;
        if (this.props.timeOf === 'day') {
            weatherIcon = clear
        } else weatherIcon = clearNight;
        if (conds.weatherId < 299) {
            weatherIcon = thunderstorm;
        } else if (conds.weatherId > 299 && conds.weatherId < 450) {
            weatherIcon = drizzle;
        } else if (conds.weatherId > 499 && conds.weatherId < 550) {
            weatherIcon = rain;
        } else if (conds.weatherId > 599 && conds.weatherId < 650) {
            weatherIcon = snow;
        } else if (conds.weatherId > 700 && conds.weatherId < 790) {
            weatherIcon = atmos;
        } else if (conds.weatherId > 800) {
            if (this.props.timeOf === 'day') {
                weatherIcon = clouds;
            } else weatherIcon = cloudsNight;
        }
        return (
            <div className="now_info">
                <div>
                    <h3>{(conds.temp > 0) ? `+${conds.temp}` : `${conds.temp}`}&#8451;</h3>
                    <h4>{conds.weather}</h4>
                    <p>Feeling like, t: {(conds.feel > 0) ? `+${conds.feel}` : `${conds.feel}`}&#8451;</p>
                    <p>Clouds: {conds.clouds}%</p>
                    <p> Pressure: {conds.pressure} mm Hg</p>
                    <p>Wind: {conds.wind}m/s {windDir}</p>
                    <p> Sunrise: {conds.sunrise} - Sunset: {conds.sunset}</p>
                </div>
                <div className='weatherIcon'>
                    <img src={weatherIcon} alt=""/>
                </div>
            </div>
        )
    }
};