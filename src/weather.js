


function onGeoOk(position){

const lat = position.coords.latitude;
const long = position.coords.longitude;
const API_KEY="ebdee54f2896e1392a5d3cef16dcae93";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`

fetch(url).then(response => response.json()).then(date =>{
    const weather = document.querySelector("#weather"); 
    weather.innerText =`${date.name}  /  ${date.weather[0].main}`;
});

}

function onGeoError(){
    console.log("날씨정보를 받아올 수 없습니다.")
}



navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);

