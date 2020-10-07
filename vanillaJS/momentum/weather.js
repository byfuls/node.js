const weather = document.querySelector(".js-weather");

const API_KEY = "01d320662f26e97901c3545861e78cdf";
const COORDS = 'coords';

function getWeather(lat, lng){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
	).then(response => {
		return response.json();		// return promise => next then proceed 
	}).then(json => {
		//console.log(json);
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`
	});
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude: latitude,			// == latitude,
		longitude: longitude		// == longitude
	}
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log("Can't access geo location")
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);

	if(loadedCoords === null){
		askForCoords();
	}else{
		// get Weather
		const parseCoords = JSON.parse(loadedCoords);
		console.log(parseCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init(){
	loadCoords();
}

init();
