let numberOfCards = 0;
const apiKey = 'eb380ce293c80acb396c9d71258f3d32';
const form = document.querySelector('form');
const weatherDisplay = document.querySelector('#weather-results');
var formInput = document.querySelector('#city-input');
var inputVal;
var result;
var res;
var states;

//Function to delete the various cards using the id
function deleteCard(n){
    document.getElementById(n).remove();
    numberOfCards--;
}

//On form submission collect the input of the user and prevent the page from reloading
form.addEventListener('submit', e => {
    e.preventDefault();
    inputVal = formInput.value.toString();
    if(numberOfCards > 0){
        let alreadySearched = document.getElementsByClassName('city');
        for(let i = 0; i < alreadySearched.length; i++){
            let element = alreadySearched[i].innerText.toString();
            console.log(element);
            if(element.indexOf(inputVal) !== -1){
                let alreadySearchedCards = document.getElementsByClassName('weather-card');
                alreadySearchedCards[i].remove();
            }
        }
    }
    useWeather();
});

async function fetchStates(){
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('api-token','D5ZOKr2VHZcCJfb4_tCeHI5VTXpoP-fvoTLyIy8hGIrVqsgFZThkIO9x-dEnt2wvOIg');
    headers.append('user-email','arannya.karak@gmail.com');
        try {
            let response1 = await fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
                // mode: 'no-cors',
                // credentials: 'include',
                method: 'GET',
                headers: headers
            });
            // let response = await fetch(`https://api.waqi.info/feed/${city}/?token=c3d00f04680ed6402e8567a9314b1df8073cae74`);
            let data1 = await response1.json();
            console.log("START");
            console.log(data1.auth_token);
            console.log("END");
        // } catch (err1) {
        //     //this only runs if an error occurs in above process
        //     console.log('Oops!', err1);
        // }

      ////////

      let tkn = "Bearer " + data1.auth_token;
      
      
     let headers2 = new Headers();

     headers2.append('Content-Type', 'application/json');
     headers2.append('Accept', 'application/json');
     headers2.append('Authorization', tkn);
        //   try {
              let response2 = await fetch(`https://www.universal-tutorial.com/api/states/United%20States`, {
                  method: 'GET',
                  headers: headers2
              });
              let data2 = await response2.json();
            //   console.log("START");
            //   console.log(data2);
            // for(let i = 0; i < data2.length; i++){
            //     console.log(data2[i].state_name);
            // }
            //   console.log("END");
              return data2;
          } catch (err1) {
              //this only runs if an error occurs in above process
              console.log('Oops!', err1);
          }

      /////
}

async function fetchWeather(key,city){
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    let data = response.json();
    return data;
}

async function useWeather(){
    try{
        states = await fetchStates();

            for(let i = 0; i < states.length; i++){
                console.log(states[i].state_name);

                result = await fetchWeather(apiKey, states[i].state_name);
                res = await fetchLattLong(states[i].state_name);
            
                addCard();
            }
    }
    catch(error){
        alert('Please enter a valid city');
        form.reset();
        formInput.focus();
    }
}

async function fetchLattLong(city){
    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('origin','http://127.0.0.1:5503');
    try {
        // let response = await fetch(`https://api.waqi.info/feed/austin/?token=c3d00f04680ed6402e8567a9314b1df8073cae74`, {
        //     // mode: 'no-cors',
        //     // credentials: 'include',
        //     method: 'GET',
        //     headers: headers
        // });
        let response = await fetch(`https://api.waqi.info/feed/${city}/?token=c3d00f04680ed6402e8567a9314b1df8073cae74`);
        let data = await response.json();
        return data;
    } catch (err) {
        //this only runs if an error occurs in above process
        console.log('Oops!', err);
    }
}

function addCard(){
    numberOfCards ++;
    var {name, main, sys, wind, weather} = result;
    var {data, status} = res;

    let newCard = `<div class="weather-card" id="card-${numberOfCards}">
    <button class="card-pin" onClick="deleteCard('card-${numberOfCards}')"></button>
    <div class="city">${name}<sup>${sys.country}</sup></div>
    <div class="temperature">${Math.round(main.temp)}<sup>o</sup>C</div>
    <div class="weather">
        <div class="weather-icon"><img src="asset/cloudy.png" alt="${weather[0].main} icon"></div>
        <div class="weather-description">${weather[0].description}</div>
    </div>
    <div class="wind-speed">Wind speed: ${wind.speed}m/s</div>
    <div class="humidity">Humidy: ${main.humidity}%</div>
    <div class="airq"> 
    <div class="wind-icon"><img src="asset/wind.png" alt="${weather[0].main} icon"></div>
    <div class="air">AQI: ${data.aqi}%</div>
    
    </div> 
    <div class="sta">Status: ${status}</div>
</div>`;

    weatherDisplay.insertAdjacentHTML("afterbegin",newCard);
    document.getElementById(`card-${numberOfCards}`).style.animation = 'card-spin 1s ease-out';
    form.reset();
    formInput.focus();
}





