export default class GeoApi {
    API_KEY = "068466b35edefcaf2ee068f6a760aae1";

    getResource = async (search) => {
        const res = await fetch(`http://htmlweb.ru/geo/api.php?city_name=${search}&json&api_key=${this.API_KEY}`);
        if (!res.ok) {
            throw new Error(`Could not fetch nothing` +
                `, received ${res.status}`)
        }
        return await res.json();
    };
    getCities = async (searchCity) => {
        const cities = await this.getResource(searchCity);
        return Object.values(cities).filter(item => item.id);
    };
}