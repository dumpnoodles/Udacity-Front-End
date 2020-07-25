const app = require('./server');

// Setup Server

const port = 8000;

const listening = () => {
  console.log('server running');
  console.log(`running on hostlost: ${port}`);
}

app.listen(port, listening())
