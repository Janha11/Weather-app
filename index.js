const temp=document.querySelector('#temp')
const currentLocatin=document.querySelector('#location')
const condition= document.querySelector('#condition')
const rain= document.querySelector('#rain')



let currentCity=''
let currentUnit='C'
let hourlyorWeek='Week'

                                                 // Date-time updateSection
const getDateTime =()=> {
    const now = new Date();
    const { hours, minutes, day } = {
        hours: now.getHours() % 12,
        minutes: now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
        day: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ][now.getDay()]
    };

    return `${day}, ${hours < 10 ? '0' + hours : hours}:${minutes}`;
}
const updateDateTime = () => {
    document.getElementById('date-time').innerHTML = getDateTime();
};
updateDateTime();
setInterval(updateDateTime, 60000); 

                                    // Date and time section end
let today;
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        currentCity = data.currentCity;
        getWeatherData(data.city,currentUnit,hourlyorWeek)
        console.log(data);
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


getPublicIp();
 
                                             // This is for getting the Waeather Data for the currentCity



function getWeatherData(city, unit, hourlyorWeek) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        today = data.currentConditions;
        if (unit == "C") {
            temp.innerText = today.temp;
        } else {
            temp.innerText = celciusToFahrenheit(today.temp);
        }
        currentLocatin.innerText = data.resolvedAddress;
        condition.innerText = today.conditions;
        today2 = data.currentConditions;
   
        const todayData = [
            { title: "UvIndeex", conditions: today2.uvindex, level: measureUvIndex(today2.uvindex) },
            { title: "Visibility", conditions: today2.visibility, level:measureVisibility(today2.visibility)  },
            { title: "Humidity", conditions: today2.humidity, level: measureHumidity(today2.humidity) },
            { title: "WindSpeed", conditions: today2.windspeed, level: "Km/h" },
            { title: "SunRise", conditions: convertTo12HourFormat(today2.sunrise), level: convertTo12HourFormat(today2.sunset) },
            { title: "AirQulity", conditions: today2.winddir, level: measureAirQuality(today2.winddir) }
           
        ];
        updateCards(todayData);
        // rain.innerText = 'Perx-' + today.precip + '%';
        console.log("Today:", today);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}





function celciusToFahrenheit(temp){
return((temp*9)/5+32).toFixed(1);
}

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
 




