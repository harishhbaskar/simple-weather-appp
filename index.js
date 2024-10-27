const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "179ec9b265ac8bcc7dd88246172f37c9";

weatherForm.addEventListener("submit",async event =>{
    
    event.preventDefault();

    city = cityInput.value;

    if(city){

        try{

            const weatherInfo = await getWeatherInfo(city);
            displayWeather(weatherInfo);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a City")
    }
});

async function getWeatherInfo(){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response  = await fetch(apiURL);
    
    if(!response.ok){
        throw new error("couldn't fetch weather data")
    }

    return await response.json()
}

function displayWeather(data){

    const {name : city ,
           main : {temp , humidity}, 
           weather : [{description , id}]} = data;

    card.textContent = "";
    card.style.display = "flex" ;

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.textContent = `City : ${city}`;
    tempDisplay.textContent = `Temperature : ${(temp - 273.15) .toFixed(1)}°C`;
    humidityDisplay.textContent = `humidy : ${humidity} %`;
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}