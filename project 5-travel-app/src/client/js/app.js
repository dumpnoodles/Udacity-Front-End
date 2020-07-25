/* Global Variables */
const geoBaseURL = 'http://api.geonames.org/searchJSON?q=';
const geoApiKey = '&maxRows=xxxxxxx&username=xxxxxxx';
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherApiKey = '&key=xxxxxxx';
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayApiKey = 'xxxxxxx';
const currentTime = (Date.now()) / 1000;
let formData = {};


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+ 1) +'-'+ d.getDate()+'-'+ d.getFullYear();

// Button event
document.getElementById('addTrip').addEventListener('click', performAction);
document.getElementById('removeTrip').addEventListener('click', removeAction);
document.getElementById('watchTrip').addEventListener('click', watchTrip);

// Get Api Data and change UI
export function performAction(e){
  e.preventDefault();

  // clear localStorage
  localStorage.clear();

  // clear input data
  clearSearch();

  // Get the data from server and update the UI
  getCityData(geoBaseURL,geoApiKey).then((cityData) => {
    // test api data
    if(!cityData) {
      return
    }
    if(cityData.geonames.length === 0) {
      alert('There is no search result!!')
      return
    }

    // Get latitude, longitude
    const cityLat = cityData.geonames[0].lat;
    const cityLng = cityData.geonames[0].lng;

    // Get weather data
    getWeatherData(cityLat, cityLng).then((weatherData) => {
      //  test if user input departtime
      const departure = document.getElementById('departure').value;
      if(!departure) {
        alert('Please input a Time!');
        return
      }

      // get weather data
      const minTemp = weatherData.data[0].max_temp;
      const maxTemp = weatherData.data[0].min_temp;
      const weather = weatherData.data[0].weather.description;

      // set weather data to formData
      formData.minTemp = minTemp;
      formData.maxTemp = maxTemp;
      formData.weather = weather;

      // set data to localStorage
      localStorage.setItem('minTemp', minTemp);
      localStorage.setItem('maxTemp', maxTemp);
      localStorage.setItem('weather', weather);

      getDaysLeft();
      updateUI();
      getPhotoData();
    })
  })
}

// removeButton event
export function removeAction(e) {
  e.preventDefault();

  // clear localStorage
  localStorage.clear();

  // clear result data
  clearSearch();

  // reset input
  document.getElementById('cityName').value = '';
  document.getElementById('departure').value = '';
}

// watchPlanButton event
export function watchTrip(e) {
  e.preventDefault();

  // clear input data
  clearSearch();

  // reset input
  document.getElementById('cityName').value = '';
  document.getElementById('departure').value = '';

  // get LocalStorage data
  if(localStorage.hasOwnProperty('weather')) {
    getLocalStorage();;
  }
}

// Get city data
export const getCityData = async (baseURL, key) => {
  // Get input value
  const newCityName =  encodeURIComponent(document.getElementById('cityName').value);

  // if cityName is empty, return
  if(!newCityName) {
    alert('Please input a CityName!');
    return
  }

  // set cityName to formData Object
  formData.newCityName = newCityName;

  // if departure is empty, return
  const departure = document.getElementById('departure').value;
  if(!departure) {
    alert('Please input a departure time!');
    return
  }

  localStorage.setItem('newCityName', newCityName);


  const res = await fetch(baseURL+newCityName+key);
  try {
    const data = await res.json();
    if(data) {
      return data;
    }
  }catch(error) {
    console.log("error", error);
  }
}

// Use cityLat,cityLng to get weather data
export const getWeatherData = async (cityLat, cityLng) => {

  const res = await fetch(weatherURL+ 'lat='+ cityLat +'&lon=' + cityLng +weatherApiKey);
  try {
    const weatherData = await res.json();
    return weatherData;
  }catch(error) {
    console.log("error", error);
  }
}

// Get Left Days
export const getDaysLeft = () => {
  const departure = document.getElementById('departure').value;
  // if departureTime is empty, return
  if(!departure) {
    alert('Please input a departure time!');
    return
  }

  localStorage.setItem('departure', departure);

  // calculate daysLeft
  const departureTime = (new Date(departure).getTime()) / 1000;
  const daysLeft = Math.round((departureTime - currentTime) / 86400);

  formData.daysLeft = daysLeft;
  localStorage.setItem('daysLeft', daysLeft);
}

// Get City Photo Data
export const getPhotoData = async () => {
  const photoData = await fetch(pixabayURL + pixabayApiKey + "&q=" + formData.newCityName + "+city&image_type=photo");

  try {
    const photoLink = await photoData.json();
    if(!photoLink) {
      const photoNoFound = document.getElementById('city');
      photoNoFound.innerHTML = 'City Photo: Sorry, photo not found!';
      return
    }

    // get photo and create img element
    const photo = document.getElementById('photo');
    const imgElement = document.createElement('img');
    photo.appendChild(imgElement);
    imgElement.className = 'imgLink';
    if(!photoLink.hits[0]) {
      const photoNoFound = document.getElementById('city');
      photoNoFound.innerHTML = 'City Photo: Sorry, photo not found!';
      return
    }else {
      const webformatURL = photoLink.hits[0].webformatURL;
      localStorage.setItem('webformatURL', webformatURL);
      imgElement.setAttribute('src', webformatURL);
    }
  }
  catch (error) {
    console.log("error", error);
  }
}

// getDaysLeftStorage
export let getDaysStorage = () => {
  // if localStorage exist data
  if(localStorage.hasOwnProperty('daysLeft')) {
    const daysLeftStorage = localStorage.getItem('daysLeft');
    if(daysLeftStorage > 0) {
      if(daysLeftStorage === 1) {
        document.getElementById('tip').innerHTML = `Tips: ${daysLeftStorage} day left`;
      }else {
        document.getElementById('tip').innerHTML = `Tips: ${daysLeftStorage} days left`;
      }
    }else if (daysLeftStorage == 0) {
      document.getElementById('tip').innerHTML = `Tips: Your trip is starting. Good Luck!`;
    }else {
      document.getElementById('tip').innerHTML = `Tips: The time you input had passed`;
    }
  }else { //  if localStorage don't exist data
    if(formData.daysLeft > 0) {
      if(formData.daysLeft === 1) {
        document.getElementById('tip').innerHTML = `Tips: ${formData.daysLeft} day left`;
      }else {
        document.getElementById('tip').innerHTML = `Tips: ${formData.daysLeft} days left`;
      }
    }else if (formData.daysLeft = 0) {
      document.getElementById('tip').innerHTML = `Tips: Your trip is starting. Good Luck!`;
    }else {
      document.getElementById('tip').innerHTML = `Tips: The time you input was incorrect`;
    }
  }
}

// Clear result data
export const clearSearch = () => {
  document.getElementById('tip').innerHTML = "Tips: ";
  document.getElementById('maxTemp').innerHTML = "Max-Temp: ";
  document.getElementById('minTemp').innerHTML = "Min-Temp: ";
  document.getElementById('content').innerHTML = "Weather: ";
  document.getElementById('city').innerHTML = "City Photo: ";
  document.getElementById('photo').innerHTML = "";
}


// Update UI
export const updateUI = () => {
  getDaysStorage();
  document.getElementById('maxTemp').innerHTML += formData.maxTemp;
  document.getElementById('minTemp').innerHTML += formData.minTemp;
  document.getElementById('content').innerHTML += formData.weather;
}

// get photo from localStorage
export const getPhotoStorage = () => {
  const URLStorage = localStorage.getItem('webformatURL');
  if(!URLStorage) {
    const photoNoFound = document.getElementById('city');
    photoNoFound.innerHTML = 'Sorry, photo not found!'
    return
  }
  const photo = document.getElementById('photo');
  const imgElement = document.createElement('img');
  photo.appendChild(imgElement)
  imgElement.className = 'imgLink';
  imgElement.setAttribute('src', URLStorage);
}

// Get result data from localStorage
export let getLocalStorage = () => {
    // get left days from localStorage
    getDaysStorage();

    const maxTempStorage = localStorage.getItem('maxTemp');
    const minTempStorage = localStorage.getItem('minTemp');
    const weatherStorage = localStorage.getItem('weather');
    const cityStorage = localStorage.getItem('newCityName');
    const departureStorage = localStorage.getItem('departure');
    document.getElementById('cityName').value = cityStorage;
    document.getElementById('departure').value = departureStorage;
    document.getElementById('maxTemp').innerHTML += maxTempStorage;
    document.getElementById('minTemp').innerHTML += minTempStorage;
    document.getElementById('content').innerHTML += weatherStorage;
    // get photo from localStorage
    getPhotoStorage();
}







