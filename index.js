const temp=document.querySelector('#temp')
const currentLocatin=document.querySelector('#location')
const condition= document.querySelector('#condition')
const rain= document.querySelector('#rain')
const mainIcon =document.querySelector('#main-icon')
 const temp_unit=document.querySelector('.tmp-unit')


const hourlyBtn =document.querySelector('.hourly'),
weekBtn =document.querySelector('.week'),
celciusBtn=document.querySelector('.celcius'),
FahrenheitBtn =document.querySelector('.Fahrenheit')

console.log(weekBtn)



let currentUnit='C'
let hourlyorWeek='Week'
let currentCity=''

const setupEventListeners = (city) => {
    hourlyBtn.addEventListener('click', () => {
      hourlyorWeek = 'Hourly';
      getWeatherData(city, currentUnit, hourlyorWeek);
    });
  
    weekBtn.addEventListener('click', () => {
      hourlyorWeek = 'Week';
      getWeatherData(city, currentUnit, hourlyorWeek);
    });
  
    celciusBtn.addEventListener('click', () => {
      currentUnit = 'C';
      getWeatherData(city, currentUnit, hourlyorWeek);
    });
  
    FahrenheitBtn.addEventListener('click', () => {
      currentUnit = 'F';
      getWeatherData(city, currentUnit, hourlyorWeek);
    });
  };
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search");
    const searchInput = document.getElementById("search_input");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        const searchValue = searchInput.value;
        console.log("Search Value:", searchValue);
       
        getWeatherData(searchValue, currentUnit, hourlyorWeek);
        setupEventListeners(currentCity);
    });
});
  
  
  


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
        setupEventListeners(data.city)
        
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
          // rain.innerText = 'Perx-' + today.precip + '%';
        mainIcon.src =getIcon(today.icon)
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
        updateWeatherCards(data,unit,hourlyorWeek)
        changeBackground(today.icon)
        
      
      
        console.log("Today:", today);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("The City is not in the Your DataBase")
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

 function convertTo12HourFormat1(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const period = hours < 12 ? 'AM' : 'PM';
  const twelveHourFormat = (hours % 12 || 12) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + period;
  return twelveHourFormat;
}
 function convertTo12HourFormat(timeString) {
     const [hour, minute, second] = timeString.split(':').map(Number);
 
     
     const period = hour < 12 ? 'AM' : 'PM';
 
   
     const twelveHourFormat = (hour % 12 || 12) + ':' + minute + ' ' + period;
 
     return twelveHourFormat;
 }
 function getIcon(iconDetails) {
 
    const conditions = {
      "partly-cloudy-day"   : "https://i.ibb.co/PZQXH8V/27.png",
      "partly-cloudy-night" : "https://i.ibb.co/Kzkk59k/15.png",
      "rain"                : "https://i.ibb.co/kBd2NTS/39.png",
      "clear-day"           : "https://i.ibb.co/rb4rrJL/26.png",
      "clear-night"         : "https://i.ibb.co/1nxNGHL/10.png",
      "cloudy"              : "https://i.ibb.co/rb4rrJL/26.png"
    };

console.log('workin')
    return conditions[iconDetails] 
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


 function changeBackground(iconDetails) {
  const body = document.querySelector("body");
  const conditions = {
    "partly-cloudy-day"   : "https://i.ibb.co/qNv7NxZ/pc.webp",
    "partly-cloudy-night" : "https://i.ibb.co/RDfPqXz/pcn.jpg",
    "rain"                : "https://i.ibb.co/h2p6Yhd/rain.webp",
    "clear-day"           : "https://i.ibb.co/WGry01m/cd.jpg",
    "clear-night"         : "https://i.ibb.co/kqtZ1Gx/cn.jpg"
  };
  const defaultbg ='https://i.ibb.co/qNv7NxZ/pc.webp'
  let bg = conditions[iconDetails] || defaultbg ;
  
  body.style.setProperty('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`, 'important');
}


 function updateWeatherCards(data, unit, hourlyorWeek) {
  console.log(data);
  console.log(data.days[0].hours);

  const date = new Date();
  const dayOfWeek = date.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weatherCard = document.querySelector('#weather-cards');
  weatherCard.innerHTML = '';

  if (hourlyorWeek === 'Week') {
    if (data && data.days && Array.isArray(data.days)) {
      for (let i = 0; i < Math.min(7, data.days.length); i++) {
        const day = data.days[i];
        const dayName = days[(dayOfWeek + i) % 7];

        const cardHtml = `
          <div class="card-in">
            <h2 class="day-name">${dayName}</h2>
            <div class="card-icon">
              <img class="img-fluid" src=${getIcon(day.icon)} alt='image'/>
            </div>
            <div class="day-temp">
              <h2 class="h2">${unit === 'F' ? celciusToFahrenheit(day.temp) : day.temp}</h2>
              <span>°${unit}</span>
            </div>
          </div>
        `;

        weatherCard.innerHTML += cardHtml;
      }
    }
  } else {
    const hourlyCardsHtml = data.days[0].hours.map((hour, index) => {
      return `
        <div class="card-in" id=${index}>
          <h2 class="day-name">${convertTo12HourFormat1(hour.datetime)}</h2>
          <div class="card-icon">
            <img class="img-fluid" src=${getIcon(hour.icon)} alt='image'/>
          </div>
          <div class="day-temp">
            <h2 class="h2">${unit === 'F' ? celciusToFahrenheit(hour.temp) : hour.temp}</h2>
            <span>°${unit}</span>
          </div>
        </div>
      `;
    });

    weatherCard.innerHTML = hourlyCardsHtml.join('');
  }
}


