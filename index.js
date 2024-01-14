import { cardsHTML } from './Cards.js';

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

function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        currentCity = data.currentCity;
        getWeatherData(data.city,currentUnit,hourlyorWeek)
       
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
console.log(currentCity)

getPublicIp();
 
                                             // This is for getting the Waeather Data for the currentCity


function getWeatherData(city, unit, hourlyorWeek) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`, {
        method: "GET"
    }).then((response) => (
        response.json()
    ))
    .then((data) => {
        console.log(data);

       let today = data.currentConditions; // Fix the property name here
        MainData= data.currentConditions
        console.log(today,MainData)
        if (unit == "C") {
            temp.innerText = today.temp;
        } else {
            temp.innerText = celciusToFahrenheit(today.temp);

        }
        currentLocatin.innerText=data.resolvedAddress
        condition.innerText=today.conditions
        // rain.innerText='Perx-'+today.precip+'%'
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function celciusToFahrenheit(temp){
return((temp*9)/5+32).toFixed(1);
}





// THis Section is for Highlights
const cardsContainer = document.getElementById('card');
cardsContainer.innerHTML = cardsHTML.join('');