import React, { Component } from 'react';
import './app.css';
import CitySearch from "../city-search";
import Time from "../time";
import NowInfo from "../now-info";
import OpenWeatherInfo from "../../services/openweather-service/openweather-info";
import Hourly from "../hourly-info";
import ThreeDays from "../3days-info";
import WeekInfo from "../week-info";
import PromoList from "../promoList";

export default class App extends Component {
    openWeatherInfo = new OpenWeatherInfo();

    state = {
        yourCity: {},
        currentWeather: {},
        hourlyWeather: [],
        dailyWeather: {},
        timeOfDay: '',
    }

    choiseCity = () => {
        let val = document.getElementById("searchInput").value;
        let opts = document.getElementById('city').childNodes;
        for (let i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                const newCity = {
                    english: opts[i].getAttribute('header'),
                    lon: opts[i].getAttribute('lon'),
                    lat: opts[i].getAttribute('lat'),
                    country: opts[i].getAttribute('country'),
                }
                this.setState(() => {
                    return {
                        yourCity: newCity
                    }
                });
                this.getWeatherNow(newCity.lat, newCity.lon);
                this.getHourlyWeather(newCity.lat, newCity.lon);
                this.getDailyWeather(newCity.lat, newCity.lon);
                this.getTimeOfDay(newCity.lat, newCity.lon);
                document.getElementById("searchInput").value = "";
                break;
            };
        };
    }

    choisePromoCity = (e) => {
        const cityPromo = e.target;
        const newCity = {
            english: cityPromo.getAttribute('value'),
            lon: cityPromo.getAttribute('lon'),
            lat: cityPromo.getAttribute('lat'),
            country: cityPromo.getAttribute('country'),
        }
        this.setState(() => {
            return {
                yourCity: newCity
            }
        });
        this.getWeatherNow(newCity.lat, newCity.lon);
        this.getHourlyWeather(newCity.lat, newCity.lon);
        this.getDailyWeather(newCity.lat, newCity.lon);
        this.getTimeOfDay(newCity.lat, newCity.lon);
    }

    getTimeOfDay = async (lat, lon) => {
        let bodyItem = document.getElementById('switchBackground');
        const currentWeather = await this.openWeatherInfo.getWeatherNow(lat, lon);
        if (currentWeather.timeNow > currentWeather.sunrise && currentWeather.timeNow < currentWeather.sunset) {
            bodyItem.classList.remove('night');
            bodyItem.classList.add('day');
            this.setState({
                timeOfDay: 'day'
            })
        } else {
            bodyItem.classList.remove('day');
            bodyItem.classList.add('night');
            this.setState({
                timeOfDay: 'night'
            })
        }
    }

    getWeatherNow = async (lat, lon) => {
        const currentWeather = await this.openWeatherInfo.getWeatherNow(lat, lon);
        this.setState({
            currentWeather
        })
    }

    getHourlyWeather = async (lat, lon) => {
        const hourlyWeather = await this.openWeatherInfo.getHourlyWeather(lat, lon);
        this.setState({
            hourlyWeather
        })
    }

    getDailyWeather = async (lat, lon) => {
        const dailyWeather = await this.openWeatherInfo.getDailyWeather(lat, lon);
        this.setState({
            dailyWeather
        })
    }

    render() {
        return (
            <div className="App">
                <div className="rightSide">
                    <CitySearch choiseCity={this.choiseCity}/>
                    <Time time={this.state.currentWeather.timezone} />
                </div>

                    <div className="main">
                        <h1>{(this.state.yourCity.english) ? this.state.yourCity.english : `Weather App` }</h1>
                        {(this.state.yourCity.english) ?
                        <NowInfo lat={this.state.yourCity.lat} lon={this.state.yourCity.lon}
                                 conds={this.state.currentWeather} timeOf={this.state.timeOfDay}/> : <PromoList choiseCity={this.choisePromoCity} />}
                    </div>
                {this.state.yourCity.english &&
                    <div className="tabs">
                        <input type="radio" name="tab-btn" id="tab-btn-1" value="" defaultChecked={true} />
                        <label htmlFor="tab-btn-1">Hourly Forecast</label>
                        <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
                        <label htmlFor="tab-btn-2">3 Days Forecast</label>
                        <input type="radio" name="tab-btn" id="tab-btn-3" value="" />
                        <label htmlFor="tab-btn-3">Week Forecast</label>
                        <Hourly hourly={this.state.hourlyWeather} timeOf={this.state.timeOfDay} />
                        <ThreeDays threeDays={this.state.dailyWeather} timeOf={this.state.timeOfDay}/>
                        <WeekInfo week={this.state.dailyWeather} timeOf={this.state.timeOfDay}/>
                    </div>

                }
            </div>
        );
    }
};

