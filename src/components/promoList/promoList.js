import React, { Component } from 'react';
import './style.css';

export default class PromoList extends Component {
    citiesPromo = [
        {"id": 3, "country": "KN", "english": "Ottawa ", "latitude": 45.4111, "longitude": -75.6981, "time_zone": -5, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_kanada_new.jpg'},
        {"id": 9, "country": "NO", "english": "Longyearbyen", "latitude": 78.13, "longitude": 15.38, "time_zone": 1, url: 'https://www.megaflag.ru/sites/default/files/images/directory_names/flag_norvegija_enl.jpg'},
        {"id": 4, "country": "RU", "english": "Moscow", "latitude": 55.7558, "longitude": 37.6173, "time_zone": 3, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_rf_enl.jpg'},
        {"id": 11, "country": "US", "english": "Whitehorse ", "latitude": 60.7161, "longitude": -135.0537, "time_zone": -7, url: 'https://www.megaflag.ru/sites/default/files/images/directory_names/flag_usa_enl.jpg'},
        {"id": 2, "country": "GB", "english": "London", "latitude": 51.5115, "longitude": -0.1309, "time_zone": 0, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_velikobritanija_new.jpg'},
        {"id": 1, "country": "UA", "english": "Kiev", "latitude": 50.2716, "longitude": 30.3125, "time_zone": 2, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_ukraina_new.jpg'},
        {"id": 10, "country": "KZ", "english": "Astana", "latitude": 51.1333, "longitude": 71.4333, "time_zone": 6, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_kazahstan_new.jpg'},
        {"id": 6, "country": "JP", "english": "Tokio", "latitude": 35.7, "longitude": 139.6, "time_zone": 9, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_japonija_enl.jpg'},
        {"id": 8, "country": "BR", "english": "Brasilia", "latitude": -15.7989, "longitude": -47.8667, "time_zone": -3, url: 'https://www.megaflag.ru/sites/default/files/images/directory_names/flag_brazilija_enl.jpg'},
        {"id": 5, "country": "UA", "english": "Cape Town", "latitude": 33.5533, "longitude": 18.2523, "time_zone": 2, url: 'https://www.megaflag.ru/sites/default/files/images/directory_names/flag_juar_enl.jpg'},
        {"id": 0, "country": "LK", "english": "Colombo", "latitude": 6.9319, "longitude": 79.8477, "time_zone": 5, url: 'https://www.megaflag.ru/sites/default/files/images/shop/products/flag_shri_lanka_new.jpg'},
        {"id": 7, "country": "AU", "english": "Sydney", "latitude": -33.8688, "longitude": 151.2093, "time_zone": 11, url: 'https://www.megaflag.ru/sites/default/files/images/directory_names/flag_avstraliya_enl.jpg'},];

    render () {
        return (
            <div id='citiesPromo'>
                {
                    this.citiesPromo.map((item) => {
                        return (
                            <div key={item.id + 1234} className='cityPromo'>
                                <img src={item.url} alt={`${item.english}-logo`} id={item.id} value={item.english} lon={item.longitude}
                                     lat={item.latitude} time={item.time_zone} country={item.country} onClick={this.props.choiseCity}/>
                                <h3 className='alert' key={item.id + 123456} id={item.id} value={item.english} lon={item.longitude}
                                    lat={item.latitude} time={item.time_zone} country={item.country} onClick={this.props.choiseCity}> {item.english} </h3>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}