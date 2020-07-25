const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');
const aylien = require('aylien_textapi');

const dotenv = require('dotenv');
dotenv.config();
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});


const formData = {};

// Start up an instance of app
const app = express();

app.use(cors());

app.use(bodyParser.json())  // use json

// use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));

app.get('/testApi', function (req, res) {
    res.send(mockAPIResponse)
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.post('/add', (req, res) => {
    formData.url = req.body.url;
    textapi.sentiment({
      'url': formData.url
    }, function(error, response) {
        res.send(response)
    });
})



module.exports = app;