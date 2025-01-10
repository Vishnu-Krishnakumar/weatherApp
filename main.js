let inputLocation = document.getElementById("location");
let submit = document.getElementById("submit");
let weatherData = null;
let search =""
let weather = {};
let city = document.getElementById("city")
let searchedWeather = document.getElementsByTagName("h3");
let errorDom = document.getElementById("error");
console.log(city);
console.log(searchedWeather);

submit.addEventListener("click", () => {
    search = inputLocation.value;
    weatherLocation(search)
        .then((response) => {
            if (response.ok) {
                clearDom();
                weatherDom();
            }
            else {
                // let errorText = response.text;
                clearDom();
                errorDom.innerText = response
            }
        });
             
})

async function weatherLocation(search) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=8SXMYHFMUZNLG3XP3VS5BN694`,
        { mode: "cors" }
    )
    if (response.ok) {
        let test = await weatherProcess(response);
        return response;
    }
    else {
        return response.text();
    }
    
}
function clearDom() {
    errorDom.innerText = "";
    city.innerText = ""; 
    searchedWeather[0].innerText = "";
    searchedWeather[1].innerText = "";
    searchedWeather[2].innerText = "";
    searchedWeather[3].innerText = "";
}
function weatherDom() {
    city.innerText = "Weather in " + weather.address; 
    searchedWeather[0].innerText = "Temperature: " + weather.temp;
    searchedWeather[1].innerText = "Conditions: " + weather.currentConditions;
    searchedWeather[2].innerText = "Sunrise: " + weather.sunrise;
    searchedWeather[3].innerText = "Sunset: " + weather.sunset;
    
}
function weatherConditions() {
    console.log(weather.currentConditions);
}

async function weatherProcess(response) {
    let data = await response.json();
    console.log(data);
    let alertsData = []
    for (let i of data.alerts) {
        alertsData.push(i);
    }

    console.log(alertsData);
    weather = {
        address: data.resolvedAddress,
        temp: data.days[0].temp,
        alerts: alertsData,
        datetime: data.days[0].datetime,
        sunrise: data.days[0].sunrise,
        sunset: data.days[0].sunset,
        currentConditions:data.days[0].conditions
    }

    console.log(weather);
}
 