const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('body');


// to show the date on the browser
const updateUI = (data) => {

    // instead of assigning variable like this we could use destructuring method Line 13
    /* Normal variable assigning
    const citydetail = data.cityDetail;
    const weather = data.weather; */

    //destructured method
    const { cityDetail, weather } = data;

    //update details
    details.innerHTML = `<h5 class="my-3">${cityDetail.EnglishName}</h5>
                        <div class="my-3">${weather.WeatherText}</div>
                        <div class="display-4 my-4">
                        <span>${weather.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
    `;


    //remove the d-none class after the user searches
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
    //update icons and day/night imgs
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    body.style.background = weather.IsDayTime ? "lightcyan" : "rgb(49, 47, 47)";
    time.setAttribute('src', timeSrc);


};


const updateCity = async(city) => {

    const cityDetail = await getCity(city);
    const weather = await getWeather(cityDetail.Key);

    // short object notation means the name and the value are the same no need to write temperature : temperature

    return { cityDetail, weather };

};

cityForm.addEventListener('submit', e => {

    //prevent default 
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //Update the UI with the city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});