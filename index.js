import { cardsHTML } from './Cards.js';

const temp=document.querySelector('#temp')


let currentCity=''
let currentUnit=''
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
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

getPublicIp();


// THis Section is for Highlights
const cardsContainer = document.getElementById('card');
cardsContainer.innerHTML = cardsHTML.join('');