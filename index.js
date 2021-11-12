// Server Code
// Host static files so far, we can build additional functionalities like save and serve information in database

const express = require("express");

// Creating a database: (1)
const Datastore = require("nedb");

// I imported node-fetch asynchronously unlike what the videos showed
// mod.cjs
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const dotenv = require("dotenv").config();

// To see the .env file contents
// console.log(process.env);

const app = express();

// The first thing I want to do in the web server is to listen and to specify a port, a unique number (numeric address)
app.listen(3000, () => console.log("listening at 3000"));

//1) I want to serve web-pages (the html,css, js that I made)
// named public because I want to make it clear that what I put in this directory is publicly accessible:
app.use(express.static("public"));

app.use(express.json({ limit: "1mb" }));

// Creating the database (2)
// Give the Datastore function a path to a local file on the laptop
const database = new Datastore("database.db");
//now in the finder there is an empty file called database.db
database.loadDatabase();

// Testing adding to the database:
// database.insert({ name: "Wiam", status: "happy" });
// database.insert({ name: "Nasr", status: "excited" });

app.get("/api", (request, response) => {
  //empty object because I am looking for everything
  //the call back has 2 arguments, error and the data itself:
  database.find({}, (err, data) => {
    response.json(data);
  });
});

//specifying a route for my data by specifying the method
// request var holds everything thats contained within that request (data being sent about the client)
// response is a variable I can use to send things back to the client
// called it api but can be called anything, in this case I am setting up an api for the client to send data to me
app.post("/api", (request, response) => {
  console.log("I got a request");
  const data = request.body;

  //I want insert information into the database, the moment that I am receiving it from the client
  //using Date.now() a func that returns the numbers of milliseconds that have elapsed since 1 January 1970
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);

  //   response.json({
  //     status: "Success",
  //     timestamp: timestamp,
  //     latitude: data.lat,
  //     longitude: data.lon,
  //   });
});

// Making a new endpoint for a get request calling it /weather:
// adding route parameters here as one, will split later (remember from client side, the lat and lon are coming separated by a comma)
app.get("/weather/:latlon", async (request, response) => {
  console.log(request.params);
  //inside the request object is a property called params, and inside that params object are all of the parameters:
  const latlon = request.params.latlon.split(",");
  console.log(latlon);

  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);

  // hard coding for testing purposes:
  // const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=52.4057456&lon=-1.9466447&appid=e873812b0f74fbb61ab40a03e3863fd6`;

  // fetching weather data
  const api_key = process.env.API_KEY;
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  // Fetching air quality
  const aq_url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  // this is what I will send back to the client
  const data = {
    weather: weather_data,
    air_quality: aq_data,
  };

  // after making the api call from within here, then send it back to client
  // this is what's known as a proxy server (the server is a proxy for the api)
  response.json(data);
});
