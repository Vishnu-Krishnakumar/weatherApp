const search = "LA";
let weatherData = null;
let weather = {};
weatherLocation(search)
    .then(weatherConditions);

async function weatherLocation(search) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=8SXMYHFMUZNLG3XP3VS5BN694`,
        { mode: "cors" }
    );
    let test = await weatherProcess(response);
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
        temp: data.days[0].temp,
        alerts: alertsData,
        datetime: data.days[0].datetime,
        sunrise: data.days[0].sunrise,
        sunset: data.days[0].sunset,
        currentConditions:data.days[0].conditions
    }
    console.log(weather);
}
 