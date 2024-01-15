let currentCity2;
let today2;

function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        currentCity2 = data.currentCity;
        getWeatherData(data.city);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`, {
            method: "GET"
        });
        const data = await response.json();

        console.log(data);

        today2 = data.currentConditions;
   
        const todayData = [
            { title: "UvIndeex", conditions: today2.uvindex, level: measureUvIndex(today2.uvindex) },
            { title: "Visibility", conditions: today2.visibility, level:measureVisibility(today2.visibility)  },
            { title: "Humidity", conditions: today2.humidity, level: measureHumidity(today2.humidity) },
            { title: "WindSpeed", conditions: today2.windspeed, level: "Km/h" },
            { title: "SunRise", conditions: convertTo12HourFormat(today2.sunrise), level: convertTo12HourFormat(today2.sunset) },
            { title: "AirQulity", conditions: today2.winddir, level: measureAirQuality(today2.winddir) }
           
        ];
        

        // Trigger the card update with the extracted data
        updateCards(todayData);
    } catch (error) {
        console.error('Error:', error);
    }
}
// function for the level 

function measureUvIndex(uvindex){
   return uvindex <= 2 && "Low" ||
    uvindex <= 5 && "Moderate" ||
    uvindex <= 7 && "High" ||
    uvindex <= 10 && "Very High" ||
    "Extreme";
}

function measureHumidity(humidity){
    return humidity <= 30 ? "Low" :
    humidity <= 60 ? "Moderate" :
    "High";
}
function measureVisibility(visibility){
  return visibility <= 0.3 ? "Dense Fog" :
    visibility <= 0.16 ? "Moderate Fog" :
    visibility <= 0.35 ? "Light Fog" :
    visibility <= 1.13 ? "Very Light Fog" :
    visibility <= 2.16 ? "Light Mist" :
    visibility <= 5.4 ? "Very Light Mist" :
    "Clear Air";
}
function measureAirQuality(winddir){
   return winddir <= 50 ? "Good" :
    winddir <= 100 ? "Moderate" :
    winddir <= 150 ? "Unhealthy for Sensitive Groups" :
    "UnHealthy";
}
function convertTo12HourFormat(timeString) {
    const [hour, minute, second] = timeString.split(':').map(Number);

    
    const period = hour < 12 ? 'AM' : 'PM';

  
    const twelveHourFormat = (hour % 12 || 12) + ':' + minute + ' ' + period;

    return twelveHourFormat;
}

function updateCards(data) {
    console.log(data);
    const cardsContainer = document.getElementById('card');
    const cardsHTML = data.map((item, index) => `
        <div class="card2" id=${index}>
            <h5 class="card-heading">${item.title}</h5>
            <div class="content">
                <p class="uv-index">${item.conditions}</p>
                <p class="uv-index">${item.level}</p>
            </div>
        </div>
    `);
    cardsContainer.innerHTML = cardsHTML.join('');
}
