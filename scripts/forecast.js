// Create an account at developer.accuweather.com and create a new free app you'll get the key {key}
// copy the key here so you can use the API to fetch data 
const key = "{key}";

// City information
const getCity = async(city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};
// Weather information 
const getWeather = async(id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};
