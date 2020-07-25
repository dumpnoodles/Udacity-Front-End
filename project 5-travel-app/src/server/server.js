const path = require('path');
// Require Express to run server and routes
const express = require('express');


const mockAPIResponse = require('../client/js/mock.js');

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
app.use(express.static('dist'));


app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});

module.exports = app;


