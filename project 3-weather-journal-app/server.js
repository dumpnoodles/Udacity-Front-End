// Setup empty JS object to act as endpoint for all routes
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=xxxxxx'; // 申请密钥

projectData = {
  baseURL,
  apiKey
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;

const listening = () => {
  console.log('server running');
  console.log(`running on hostlost: ${port}`);
}

const server = app.listen(port, listening())


app.get('/add', function (req, res) {
  res.send(projectData);
})


app.get('/api', function (req, res) {
  res.send(projectData);
})

app.post('/add', (req, res) => {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.send("Already received!");
})


