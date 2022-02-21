export default class OpenWeatherInfo {
    API_KEY = "beeab57a291b0ca088d6a17d82540e59";
    // _ApiRequest = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    Now = async (lat, lon) => {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${lat}` +
                `, received ${res.status}`)
        }

        return await res.json();
    };

    offset = 0;
    timeZone = 0;

    getWeatherNow = async (lat, lon) => {
        const res = await this.Now(lat, lon);
        return this._transformNow(res)
    }

    _transformNow = (item) => {
        const timeNow = new Date (item.dt * 1000);
        const sunriseTime = new Date(item.sys.sunrise * 1000);
        const sunsetTime = new Date(item.sys.sunset * 1000);
        this.offset = sunriseTime.getTimezoneOffset() * 60000;
        this.timeZone = item.timezone;
        sunriseTime.setMilliseconds(item.timezone * 1000 + this.offset);
        sunsetTime.setMilliseconds(item.timezone * 1000 + this.offset);
        timeNow.setMilliseconds(item.timezone * 1000 + this.offset);
        return {
            clouds: item.clouds.all,
            temp: item.main.temp.toFixed(1),
            feel: item.main.feels_like.toFixed(1),
            timezone: item.timezone/3600,
            timeNow: timeNow.toLocaleTimeString(),
            sunrise: sunriseTime.toLocaleTimeString(),
            sunset: sunsetTime.toLocaleTimeString(),
            pressure: item.main.pressure,
            wind: item.wind.speed.toFixed(1),
            windDeg: item.wind.deg,
            weather: item.weather[0].description,
            weatherId: item.weather[0].id,
        }
    }

  Hourly = async (lat, lon) => {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${this.API_KEY}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${lat}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getHourlyWeather = async (lat, lon) => {
        const res = await this.Hourly(lat, lon);
        const hourly = res.hourly
            .map(this._transformHourly);
        return hourly.slice(1, 13)
    }

    _transformHourly = (item) => {
        const time = new Date(item.dt * 1000);
        time.setMilliseconds(this.timeZone * 1000 + this.offset)
        return {
            time: time.getHours(),
            temp: item.temp.toFixed(),
            feels: item.feels_like.toFixed(),
            clouds: item.clouds,
            pressure: item.pressure,
            wind: item.wind_speed.toFixed(1),
            weather: item.weather[0].description,
            weatherId: item.weather[0].id,
        }
    }

    Daily = async (lat, lon) => {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${this.API_KEY}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${lat}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getDailyWeather = async (lat, lon) => {
        const res = await this.Daily(lat, lon);
        return res.daily
            .map(this._transformDaily)
    }

    _transformDaily = (item) => {
        const sunriseTime = new Date(item.sunrise * 1000);
        const sunsetTime = new Date(item.sunset * 1000);
        const moonriseTime = new Date(item.moonrise * 1000);
        const moonsetTime = new Date(item.moonset * 1000);
        sunriseTime.setMilliseconds(this.timeZone * 1000 + this.offset);
        sunsetTime.setMilliseconds(this.timeZone * 1000 + this.offset);
        moonriseTime.setMilliseconds(this.timeZone * 1000 + this.offset);
        moonsetTime.setMilliseconds(this.timeZone * 1000 + this.offset);
        const time = new Date(item.dt * 1000);
        return {
            day: time.toLocaleDateString(),
            dayTemp: item.temp.day.toFixed(1),
            nightTemp: item.temp.night.toFixed(1),
            sunrise: sunriseTime.toLocaleTimeString(),
            sunset: sunsetTime.toLocaleTimeString(),
            moonrise: moonriseTime.toLocaleTimeString(),
            moonset: moonsetTime.toLocaleTimeString(),
            wind: item.wind_speed.toFixed(1),
            pressure: item.pressure,
            weatherId: item.weather[0].id,
        }
    }
}