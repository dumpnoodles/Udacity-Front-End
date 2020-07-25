/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+ 1) +'-'+ d.getDate()+'-'+ d.getFullYear();
// Add a click event to the button
document.getElementById('generate').addEventListener('click', performAction);

// Get Api Data and change UI
function performAction(e){
  // Get zipcode Value
  const newZipCode =  document.getElementById('zip').value;

  // validate zipcode
  const regex = /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g;

  // Get user feeling
  const userFeelings = document.getElementById('feelings').value;

  // if zipcode is empty, return
  if(!newZipCode) {
    alert('Please input a Zipcode!');
    return
  }

  // if zipcode isn't verified, return
  if (!regex.test(newZipCode)) {
    alert('Please input a correct Zipcode!');
    return
  }

  // if feeling did't input , return
  if(!userFeelings) {
    alert('Please input your feeling!');
    return
  }

  // get the data from server and update the UI
  getApi().then((res) => {
    getWeatherData(res.baseURL, newZipCode, res.apiKey).then(data => {
      postWeatherData('/add', {
        temperature: data.main.temp,
        date: newDate,
        userResponse: userFeelings
      }).then(() => {
        updateUI();
      })
    })
  })
}

// Get Api
const getApi = async () => {
  const requestApiData = await fetch('/api');
  try {
    const allApiData = await requestApiData.json();
    return allApiData;
  }catch(error) {
    console.log("error", error);
  }
}

// Get Weather data
const getWeatherData = async (baseURL, zipCode, key) => {
  const res = await fetch(baseURL+zipCode+key);
  try {
    const data = await res.json();
    return data;
  }catch(error) {
    console.log("error", error);
  }
}

// Post weather data
const postWeatherData = async(url='', postData={}) => {
  responseData = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
  })

  try {
    const newData = await responseData.text();
  }catch(error) {
    console.log('error', error);
  }
}

// Update UI
const updateUI = async () => {
  const requestData = await fetch('/add');
  try {
    const allProjectData = await requestData.json();
    document.getElementById('date').innerHTML += allProjectData.date;
    document.getElementById('temp').innerHTML += allProjectData.temperature;
    document.getElementById('content').innerHTML += allProjectData.
    userResponse;
  }catch(error) {
    console.log("error", error);
  }
}






