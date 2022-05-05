let numberOfCards = 0;
const form = document.querySelector('form');
const weatherDisplay = document.querySelector('#weather-results');
var formInput = document.querySelector('#city-input');

//Function to delete the various cards using the id
function deleteCard(n){
    document.getElementById(n).remove();
    numberOfCards--;
}

//On form submission collect the input of the user and prevent the page from reloading
form.addEventListener('submit', e => {
    e.preventDefault();
    inputVal = formInput.value.toString();
    if(numberOfCards > 0) {
        let alreadySearched = document.getElementsByClassName('city');
        for(let i = 0; i < alreadySearched.length; i++){
            let element = alreadySearched[i].innerText.toString();
            console.log(element);
            if(element.indexOf(inputVal) !== -1){
                let alreadySearchedCards = document.getElementsByClassName('weather-card');
                alreadySearchedCards[i].remove()
            }
        }
    }
    showWeatherAndPosition(inputVal);
});

async function showWeatherAndPosition(city){
        var weatherResult = fetchWeather(city);
        // var positionResult = fetchLattLong(city);
        // addCard(weatherResult, positionResult);
        addCard(weatherResult);
}

async function fetchWeather(city){
    try {
        // let response = await fetch(`https://goweather.herokuapp.com/weather/${city}`); 
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=eb380ce293c80acb396c9d71258f3d32`);
        let data = await response.json();
        return data;
    } catch (err) {
        //this only runs if an error occurs in above process
        console.log('Oops!', err);
    }
}

// async function fetchLattLong(city){
//     try {
//         let response = await fetch(`https://www.metaweather.com/api/location/search/?query=Austin`, {
//             mode: 'no-cors'
//         });
//         let data = await response.json();
//         return data;
//     } catch (err) {
//         //this only runs if an error occurs in above process
//         console.log('Oops!', err);
//     }
// }

// function addCard(weatherResult, positionResult){
//     numberOfCards ++;

//     // var {temperature, wind, description} = weatherResult;
//     var {name, main, sys, wind, weather} = weatherResult;
//     var {title, latt_long} = positionResult;

//     let newCard = `<div class="weather-card" id="card-${numberOfCards}">
//     <button class="card-pin" onClick="deleteCard('card-${numberOfCards}')"></button>
//     <div class="city">${title}</div>
//     <div class="temperature">${Math.round(main.temp)}<sup>o</sup>C</div>
//     <div class="weather">
//         <div class="weather-icon"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg" alt="${weather[0].main} icon"></div>
//         <div class="weather-description">${weather[0].description}</div>
//     </div>
//     <div class="wind-speed">Wind speed: ${wind.speed}m/s</div>
//     <div class="humidity">latt_long: ${latt_long}%</div>
// </div>`;

//     weatherDisplay.insertAdjacentHTML("afterbegin",newCard);
//     document.getElementById(`card-${numberOfCards}`).style.animation = 'card-spin 1s ease-out';
//     form.reset();
//     formInput.focus();
// }

function addCard(weatherResult){
    numberOfCards ++;

    // var {temperature, wind, description} = weatherResult;
    var {name, main, sys, wind, weather} = weatherResult;
    // var {title, latt_long} = positionResult;

    let newCard = `<div class="weather-card" id="card-${numberOfCards}">
    <button class="card-pin" onClick="deleteCard('card-${numberOfCards}')"></button>
    <div class="temperature">${Math.round(main.temp)}<sup>o</sup>C</div>
    <div class="weather">
        <div class="weather-icon"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg" alt="${weather[0].main} icon"></div>
        <div class="weather-description">${weather[0].description}</div>
    </div>
    <div class="wind-speed">Wind speed: ${wind.speed}m/s</div>
</div>`;

    weatherDisplay.insertAdjacentHTML("afterbegin",newCard);
    document.getElementById(`card-${numberOfCards}`).style.animation = 'card-spin 1s ease-out';
    form.reset();
    formInput.focus();
}

