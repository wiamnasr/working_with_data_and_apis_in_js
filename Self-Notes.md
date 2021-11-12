<style>
    .modules {
        width:100%;
        
        background:rgb(200,100,0);
        font-size:50px;
        text-align: center;
    }
</style>

# [Working with Data and APIs in JavaScript](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X)

> ## **Daniel Shiffman's** Youtube [Coding Train](https://www.youtube.com/c/TheCodingTrain/featured)

<br></br>
<br></br>

| Table of Contents |
| ----------------- |

[1.1 - fetch](#fetch)

[1.2 - Tabular Data](#tabularData)

[1.3 - Graphing with Chart.js](#graphingWithChartJs)

[1.4 - JSON](#json)

[1.5 - Mapping Geolocation with Leaflet.js](#leafletGeolocationMapping)

[1.6 - Refreshing Data with setInterval()](#setIntervalDataRefresh)

[2.1 - Server-side with Node.js](#nodeJs)

[2.2 - Geolocation Web API](#geolocationWebAp)

[2.3 - HTTP Post Request with fetch()](#httpPostRequest)

[2.4 - Saving to a Database](#savingToDatabase)

[2.5 - Database Query](#databaseQuery)

[2.6 - Saving Images & Base64 Encoding](#savingImages)

[3.1 - API calls from Node.js (Weather data from Dark Sky)](#apiCalls)

[3.2 - Open Air Quality API in Node.js)](#openAirQuality)

[3.3 - Mapping Database Entries with Leaflet.js)](#mappingDatabase)

[3.4 - Hiding API Keys with Environment Variables (dotenv) and Pushing Code to GitHub](#hidingApiKeys)

<br></br>
<br></br>

<h2 class="modules">  MODULE ONE  </h2>

<br></br>
<br></br>

## <a id="fetch"> [**1.1: fetch()**](https://www.youtube.com/watch?v=tc8DU14qX6I&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=4) </a>

> #### Important Resources:

> [Fetch API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

<br></br>

1. Call fetch("url here")
2. Get the response as part of a promise => the response is a stream of data
3. We need to store the data in the formate that we need

JSON stands for Javascript Object Notation, and we will see this type of data again and again

We wrote an Async function that makes the fetch request

> 1. It turns the body of what comes back in the http response into a blob
> 2. It converts that blob into the format of blob element it expects
> 3. Displays a message that it worked or an error if not

<br></br>
<br></br>

## <a id="tabularData"> [**1.2: Tabular Data**](https://www.youtube.com/watch?v=RfMkdvN-23o&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=4) </a>

> #### Important Resources:

> [Link to downloading the .csv file](https://data.giss.nasa.gov/gistemp/)

<br></br>

### **<h2 style="margin: 0 0 0 5%">Using fetch() to grab Comma Separated Value files:</h2>**

<br></br>

#### Tabular data has different file formats for storing data in it (table format), most common is CSV:

> Data separated by comma: Using a [dataset from NASA](ZonAnn.Ts+dSST.csv):

> From GISS - [Goddard Institute for Space Studies](https://data.giss.nasa.gov/) -> Zonal Annual Means (1880-present), .csv format

            -   Contains combined global average land-surface air and sea-surface water temperature anomalies from 1880 all the way to present
            -   The values in the dataset are the differences between the Mean temperature (Average world temperature from 1951-1980 recorded by and averaged by NASA - earth observatory website at 14 degree celsius)
            -   So the data in this csv file is the difference from the Mean (from 14 degree celsius) from combined global average land-surface air and sea-surface water temperature

We want to:

1. Grab with fetch() function
2. load into my webpage
3. Parse it
4. DO something with it (e.g. graph)

### There are a lot of JS libraries to parse a csv for you

### By Parse whats meant is figure out where all the commas (in csv case) are, break up the data, put it into objects and make it usable for you

<br></br>

## [D3, a JS library for data visualization, has a parser in it](https://d3js.org/)

## [P5.js has a load table function](https://p5js.org/reference/#/p5/loadTable)

<br></br>

Using the Split function for manual Parsing:

> string objects in JS have a function called split()

> split() allows you to take any arbitrary text, and split it up into different element of an Array

> Requires a single argument, a separator (otherwise known as a delimiter)

In our data sample, the delimiter, or the thing that differentiates each row from another is a line-break, hence we called split with line break: data.split('\n')

<br></br>
<br></br>

## <a id="graphingWithChartJs"> [**1.3: Graphing with Chart.js**](https://www.youtube.com/watch?v=5-ptp9tRApM&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=5) </a>

<br></br>

> #### Important Resources:

> [Chart.js CDN](https://www.jsdelivr.com/package/npm/chart.js?path=dist)

> [URL for the most recent version of the library](https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js)

> [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

> [Chart labels - Creating Custom Tick Formats](https://www.chartjs.org/docs/latest/axes/labelling.html)

<br></br>

We will:

1.  Import the library
2.  Add a canvas
3.  Draw the chart using the data

Adding to the header:

                <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>

Will also add a canvas element, right at the beginning of the body element:

                <canvas id="chart" width="400" height="400"></canvas>

Then, tell the data to graph itself on the canvas:

> In the documentation link provided above, there will be a code for some sort of a bar chart with some data in the getting started page
> Copy paste into the script part of index.html
> at the top of \<script\> tag

<br></br>
<br></br>

## <a id="json"> [**1.4: JSON**](https://www.youtube.com/watch?v=uxf0--uiX0I&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=6) </a>

<br></br>

> #### Important Resources:

> [wheretheiss.at API](https://wheretheiss.at/)

> [wheretheiss.at API Documentation](https://wheretheiss.at/w/developer)

<br></br>

### Finding external data from an API

> ## API stands for Application Programming Interface

2 apps (computer programs), talking to each other (sending information back and forth), through a set of conventions/protocol

- You might have to authenticate

- Limit the number of requests made to the API

- Might have to provide certain parameters to your requests to get the right type of data back

The URL address of the API goes into the fetch function, we call the fetch function, and back comes the data

### Connecting to [wheretheiss.at API](https://api.wheretheiss.at/v1/satellites): An API the gives back the current location in longitude and latitude of the international space station. Other information is provided as well by this API such as altitude, velocity, visibility,... We just want to get the long and lat, display it on the web page and then plot that point on a map

### To plot the point that we get from the API on a map, will be using leaflet.js library, an open source mapping library, where all of the map images are "creative commerce licensed", other mapping libraries (gmaps, mapbox,...) are also available

<br></br>

### Before the project, remember **JSON** is **JavaScript Object Notation**: Data written into a file with the same syntax as JavaScript object literals

### We will reach out to an external API, ask for some data, that data will come in some sort of a JSON format, we want to extract the values of certain properties and do something with them

### Always look for the API documentation, for this example, it is attached in the important resources of this section

<br></br>
<br></br>

## <a id="leafletGeolocationMapping"> [**1.5: Mapping Geolocation with Leaflet.js**](https://www.youtube.com/watch?v=nZaZ2dB6pow&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=7) </a>

<br></br>

> #### Important Resources:

> [Leaflet Documentation](https://leafletjs.com/reference-1.7.1.html)

> [Leaflet Quick Start Guide](https://leafletjs.com/examples/quick-start/)

> [OpenStreetMap Attribution Link](https://www.openstreetmap.org/copyright)

<br></br>

### Now to plot the points we got for longitude and latitude from the previous section, we use Leaflet

<br />

> Will need to copy-paste some code into our html file to reference the library, from Quick Start Guide (link in Resources)
> <br />

### 1) In the header, copy paste the CSS file

### 2) The JS reference, needs to go after the CSS for Leaflet

### 3) Create a div with a certain ID, where the map is going to be placed

### 4) Make sure the div has a defined height, otherwise the map will not appear (it will assume the height is zero, if not defined)

### 5) We need to create a map object in JS and place it in the beginning of the script

### 6) Specify the tiles. These are the images of the map itself

    >   will be using tiles from OpenStreetMap, a creative common repository for mapping tiles

### 7) Look for the attribution requirements, for OpenStreetMap.

    > In this example the attributions are pasted in a new var called attribution:

const attribution = '&copy; \<a href="https://www.openstreetmap.org/copyright">OpenStreetMap\</a> contributors';

## **SIDE NOTE**: Capital "L" for leaflet is available for us when we load the Leaflet library

> ## All of the functions that I want to call, and are associated with the leaflet library, I call using "L."

                >   In the project we used L.tileLayer(...)

<br></br>
<br></br>

## <a id="setIntervalDataRefresh"> [**1.6: Refreshing Data with setInterval()**](https://www.youtube.com/watch?v=jKQUHGpOHqg&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=8) </a>

<br></br>

> #### Important Resources:

> [Leaflet Documentation](https://leafletjs.com/reference-1.7.1.html)

<br></br>

The data I am getting and plotting, is not refreshing automatically to get me updates in a set time

## Its important to remind ourselves of the rate limit of the api, that we cannot make a request more than once per second

### Always check these details when dealing with api s, otherwise you might end up incurring a lot of extra costs

## => Limit the refresh rate to a minimum, be conscious about this as you build applications that get used by more and more people, the rate, at which you are requesting data from an api is going to be a fundamental thing. At a certain point, it cost you a certain amount of money to make some requests

#### 1) First I need to make the space station more oriented to the center, with a bit more zoom when the map loads

> #### we use the "setView()" function that takes the lat and lon and zoom level:

> ## mymap.setView([latitude, longitude], 3);

#### 2) We need to get the new lon and lat every so often. This is accomplished with setInterval()

> #### setInterval(), says, take this function, and have it happen every so often

<br></br>
<br></br>

<h2 class="modules">  MODULE TWO  </h2>

<br></br>
<br></br>

## <a id="nodeJs"> [**2.1 Server-side with Node.js**](https://www.youtube.com/watch?v=wxbQP1LMZsw&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=9) </a>

## <a id="geolocationWebApi"> [**2.2 Geolocation Web API**](https://www.youtube.com/watch?v=3ls013DBcww&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=10) </a>

## <a id="httpPostRequest"> [**2.3 HTTP Post Request with fetch()**](https://www.youtube.com/watch?v=Kw5tC5nQMRY&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=11) </a>

## <a id="savingToDatabase"> [**2.4 Saving to a Database**](https://www.youtube.com/watch?v=xVYa20DCUv0&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=12) </a>

<br></br>

> #### Important Resources:

> [Node Documentation](https://nodejs.org/en/docs/)

> [Express](https://expressjs.com/)

> [Navigator Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

> [fetch Post requests](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

> [nodemon npm](https://www.npmjs.com/package/nodemon)

> [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

> [NeDB The JavaScript Database](https://www.npmjs.com/package/nedb)

> [Date.now()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)

So far, we have been using client side JavaScript (drawing the map, graphing the global temp. data and displaying them,...)

In this module, we will explore server side programming using JavaScript runtime called node.js

Will create a server that runs on the computer first

The project is called the **Data Selfie App**, an example project by **Joey Lee**, a designer and researcher

### What is Node?

> ### Normally with Javascript, Im executing that stuff in the browser, the JS has no meaning without the browser.

> ### With Node, I can start to write JS without the browser

> ### It has its own run-time => the code runs on your computer

<br />

## Using node.js to create a server, which is an application that runs and listens for requests (people who want to connect to that server)

## The server will be the central repository of the data of my application

### It's typical when working with node.js is to find a node package that has some of the functionality you're looking for, install that package (lib or add-on) and make use of that functionality

### The node package we'll use to create the web server is Express

## Express is minimal and simple framework for making web servers, has core needed functionality

### npm stands for node package manager, to use npm with a project, we'll need package.json

## package.json is where all the meta-information about our project (what node package we're using, what our web app is called?,...)

## npm init will walk you through what you need to create a package.json file

## installing express in the project: npm install express

## in order to use express, we need to require it in the index.js file:

> ## const express = require('express')

## For my App:

> ## 1) Serve Webpages => currently the server is local at 3000, but when people type the address in their browser, I want to be able to send them the html, js,css,... to be able to see in their browser

        using express to host static files:

        app.use(express.static('folder name'))

> ## 2)Save to Database

> ## 3) Authenticate

<br></br>
<br></br>

## <a id="databaseQuery"> [**2.5 Database Query**](https://www.youtube.com/watch?v=q-lUgFxwjEM&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=13) </a>

<br></br>

> #### Important Resources:

> [find in nedb](https://github.com/louischatriot/nedb#finding-documents)

### Putting pieces of what we saw before in a slightly different way

## Will look at routing again (new route and use app.get('/route') instead of app.post())

## Then will use the fetch() function again, only this time will use the simpler version for a simple GET request, just to get some information from the server itself

## Finally we need to find functionality within the Database system itself, any DB that allows me to 'query' the database (find something)

> ## there is a function called find, checkout the documentation attached in Important Resources

<br></br>
<br></br>

## <a id="savingImages"> [**2.6 Saving Images & Base64 Encoding**](https://www.youtube.com/watch?v=9Rhsb3GU2Iw&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=14) </a>

<br></br>

> #### Important Resources:

> [P5.js Documentation](https://p5js.org/reference/)

> [P5.js SDN](https://cdn.jsdelivr.net/npm/p5/lib/)

> [CDN js](https://cdnjs.com/)

> [CDN and p5.js](https://cdnjs.com/libraries/p5.js/0.8.0) => links for script tag obtained here for p5 min and dom manipulation necessary for selfie app

> [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)

## Integrating p5.js with the project

## P5.js CDN => content delivery network is a hosting service that helps deliver content

    <!-- Added to header of index.html -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js"> </script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/addons/p5.dom.min.js"> </script>

<br></br>
<br></br>

<h2 class="modules">  MODULE THREE  </h2>

<br></br>
<br></br>

## <a id="apiCalls"> [**3.1 API calls from Node.js (Weather data from Dark Sky)**](https://www.youtube.com/watch?v=ZtLVbJk7KcM&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=16) </a>

<br></br>

> #### Important Resources:

> [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

> [node-fetch](https://www.npmjs.com/package/node-fetch)

> [Route Parameters](https://expressjs.com/en/guide/routing.html)

### Creating an end point in my server that receives the lat and lon, then makes a call out to the api and then returns back the result

### The web fetch api is part of the client side browser api

### If I want to use it from within node, I can but a node package is needed for that: node-fetch (see resources)

            npm install node-fetch

> ### added as required in index.js

            const fetch = require('node-fetch');

<br />

### Sending from the client the latitude and longitude to the server so that the server can send those lat and lon to the api, get the weather, and then send the weather back to the client

> ### Will accomplish this task using route parameters

        From before, routes are used when we have a GET or POST requests I set up a route (path/endpoint) for that particular request

> ### Route Parameters are extra parts of that path that you can name and capture as variables with data sent from the client (checkout important resources)

        Another way this can be accomplished is with [URL Query string](https://en.wikipedia.org/wiki/Query_string)

## In the Express documentation, we can see that the route parameter is specified with a colon ('/')

---

                app.get('/users/:userId/books/:bookId', function (req, res) {
                res.send(req.params)
                })

---

<br></br>
<br></br>

## <a id="openAirQuality"> [**3.2 Open Air Quality API in Node.js**](https://www.youtube.com/watch?v=Tiot877orkU&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=17) </a>

<br></br>

> #### Important Resources:

> [open Air Quality](https://openaq.org/)

<br></br>
<br></br>

## <a id="mappingDatabase"> [**3.3 Mapping Database Entries with Leaflet.js**](https://www.youtube.com/watch?v=r94kI6my0QQ&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=18) </a>

<br></br>

> #### Important Resources:

> [Open AirQuality API](https://openaq.org/)

<br></br>
<br></br>

## <a id="hidingApiKeys"> [**3.4 Hiding API Keys with Environment Variables (dotenv) and Pushing Code to GitHub**](https://www.youtube.com/watch?v=17UVejOw3zA&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=19) </a>

<br></br>

> #### Important Resources:

> [dotenv](https://www.npmjs.com/package/dotenv)

<br />

How to stop my api key from just sitting there in my code?

**_Especially important if the project will be open source_**

## Will address this using an environment variable

        > Set within the framework/system I m using to run software itself, and just pul the api key as a variable to the code

## How to set environment variables with node?

> ### Different platforms will have different mechanisms for storing and retrieving environment variables

> ### In 3.5, when I m going to deploy my project to a webserver, I will have to examine how will I have those environment variables saved on this particular web-server

<br />

## For now demonstrating locally using a node package called "**_dotenv_**"

### needs to be required from the server side of course, so in the index.js

                    require('dotenv').config()

                    npm install dotenv

> Make sure the dotenv is now installed as a dependency in the package.json file

### Create a new file in the explorer from server side, so not under public => environment variables go there "**_.env_**"

### It s a convention to place the keys in a .env

## Hiding the APi and publishing the project to Github:

> 1. Create a file "**_.env_sample_**" this can be renamed into .env by other developers and its contents changed to their unique API key

> 2. Create another file "**_.gitignore_**" this tells git (version control system) not to keep track of this file, or use it anywhere
