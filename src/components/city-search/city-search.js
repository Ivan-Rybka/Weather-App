import React, {Component} from 'react';
import GeoApi from "../../services/geoapi-service/geoapi";
import './style.css'

export default class CitySearch extends Component {
    geoApi = new GeoApi();

    state = {
        city: {},
        cities: [
            {"id": 3, "country": "KN", "english": "Ottawa ", "latitude": 45.4111, "longitude": -75.6981, "time_zone": -5,},
            {"id": 9, "country": "NO", "english": "Longyearbyen", "latitude": 78.13, "longitude": 15.38, "time_zone": 1,},
            {"id": 4, "country": "RU", "english": "Moscow", "latitude": 55.7558, "longitude": 37.6173, "time_zone": 3,},
            {"id": 11, "country": "US", "english": "Whitehorse ", "latitude": 60.7161, "longitude": -135.0537, "time_zone": -7,},
            {"id": 2, "country": "GB", "english": "London", "latitude": 51.5115, "longitude": -0.1309, "time_zone": 0,},
            {"id": 1, "country": "UA", "english": "Kiev", "latitude": 50.2716, "longitude": 30.3125, "time_zone": 2,},
            {"id": 10, "country": "KZ", "english": "Astana", "latitude": 51.1333, "longitude": 71.4333, "time_zone": 6,},
            {"id": 6, "country": "JP", "english": "Tokio", "latitude": 35.7, "longitude": 139.6, "time_zone": 9,},
            {"id": 8, "country": "BR", "english": "Brasilia", "latitude": -15.7989, "longitude": -47.8667, "time_zone": -3,},
            {"id": 5, "country": "UA", "english": "Cape Town", "latitude": 33.5533, "longitude": 18.2523, "time_zone": 2,},
            {"id": 0, "country": "LK", "english": "Colombo", "latitude": 6.9319, "longitude": 79.8477, "time_zone": 5,},
            {"id": 7, "country": "AU", "english": "Sydney", "latitude": -33.8688, "longitude": 151.2093, "time_zone": 11,},
        ],

    }


    citiesList = async (e) => {
        const search = e.target.value;
        let newCitiesList;
        if (search.length > 2) {
            newCitiesList = await this.geoApi.getCities(search);
        };
        this.setState(() => {
            return {
                cities: newCitiesList
            };
        });
    }

    render() {
        return (
            <form action="" className='searchForm'>
                <input type="text" placeholder='Search' list="city" id="searchInput" onInput={this.props.choiseCity} autoComplete="off" onChange={this.citiesList}/>
                <datalist id="city" autoComplete="off" >
                    {
                        this.state.cities?.map((item) => {
                            return <option key={item.id + 123456} id={item.id} value={`${item.english}, ${item.country}`} header={item.english} lon={item.longitude}
                                    lat={item.latitude} time={item.time_zone} country={item.country}/>
                        })
                    }
                </datalist>
            </form>
        )
    }
};