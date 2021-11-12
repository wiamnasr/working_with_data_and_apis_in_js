let temperatureDescription = document.querySelector(".temperature-description");

let temperatureDegree = document.querySelector(".temperature-degree");

let locationTimezone = document.querySelector(".location-timezone");

let temperatureSection = document.querySelector(".temperature");

const temperatureSpan = document.querySelector(".temperature span");

function setup() {
  if ("geolocation" in navigator) {
    console.log("geolocation is available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat, lon, userMood, image64, fah_Tem, air, description;
      try {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        document.getElementById("latitude").textContent = lat.toFixed(2);
        document.getElementById("longitude").textContent = lon.toFixed(2);

        const api_url = `weather/${lat},${lon}`;

        // hard coding for testing purposes:
        // const api_url = `/weather`;

        const response = await fetch(api_url);
        const json = await response.json();
        console.log("here");
        console.log(json);

        const { id } = json.weather.weather["0"];
        description = json.weather.weather["0"].description;
        const { temp } = json.weather.main;

        const { name } = json.weather;

        air = json.air_quality.results[0].measurements[0];

        document.getElementById("aq_parameter").textContent = air.parameter;
        document.getElementById("aq_value").textContent = air.value;
        document.getElementById("aq_units").textContent = air.unit;
        document.getElementById("aq_date").textContent = air.lastUpdated;

        // Setting DOM elements from the API after converting from kelvin to Fahrenheit
        fah_Tem = ((temp - 273.15) * 1.8 + 32).toFixed(2);

        temperatureDegree.textContent = fah_Tem;
        temperatureDescription.textContent = description;
        locationTimezone.textContent = name;

        let celsius = ((fah_Tem - 32) * (5 / 9)).toFixed(2);

        //set icons:
        setIcons(id, document.querySelector(".icon"));

        //change temp to celcius/fahrenheit:
        temperatureSection.addEventListener("click", () => {
          if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = celsius;
          } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = fah_Tem;
          }
        });

        function setIcons(id, iconID) {
          const skycons = new Skycons({ color: "white" });
          const currentIcon = id;
          skycons.play();
          //returning it so we can run it up
          return skycons.set(iconID, Skycons[currentIcon]);
        }
      } catch (error) {
        console.log(error, "something went wrong");
        air = { value: -1 };
        document.getElementById("airQualityP").textContent = "NO READING";
      }

      const submitButton = document.getElementById("submit");
      submitButton.addEventListener("click", async function addUserMood() {
        userMood = document.getElementById("mood").value;

        // Video canvas element is not there by default, first alert p5 to the fact that I want to use a canvas using:
        // this is saying, take that video element, load the pixels onto a canvas so that I can then convert it to base 64
        video.loadPixels();

        // taking the video's canvas, converting it to base64 and putting it in this variable image64
        image64 = video.canvas.toDataURL();

        // making an object called data that will send me the lat and lon
        const data = {
          lat,
          lon,
          userMood,
          image64,
          fah_Tem,
          air,
          description,
        };

        //the function for the fetch (Post) method
        const options = {
          //specifying the method
          method: "POST",

          // the header os the post request have a name, a colon and a value
          // adds additional meta-information (checkout documentation linked to notes)
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },

          //the body of the post request, is where I am packaging all my data
          body: JSON.stringify(data),
        };

        // console.log(data);
        //fetching /api which I created in my index.js naming it /api
        const db_response = await fetch("/api", options);
        const db_json = await db_response.json();
        console.log(db_json);
      });
    });
  } else {
    console.log("geolocation is not available");
  }

  // p5.js creates a canvas automatically when the lines are added to the script
  // we don't need a canvas for this project so:
  noCanvas();

  const video = createCapture(VIDEO);
  video.size(320, 240);
}
