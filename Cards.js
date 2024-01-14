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

        // Extract today's UV index, visibility, humidity, wind status, and sunrise data
        const todayData = [
            { title: "UvIndeex", conditions: today2.uvindex, level: "Low" },
            { title: "Visibility", conditions: today2.visibility, level: "Km/h" },
            { title: "Humidity", conditions: today2.humidity, level: "04:46" },
            { title: "WindSpeed", conditions: today2.windspeed, level: "High" },
            { title: "SunRise", conditions: today2.sunrise, level: "VeryUnHealthy" },
            { title: "AirQulity", conditions: data.stations.VOCI.quality, level: "VeryUnHealthy" }
        ];

        // Trigger the card update with the extracted data
        updateCards(todayData);
    } catch (error) {
        console.error('Error:', error);
    }
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
