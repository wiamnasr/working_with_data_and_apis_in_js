// Pasting the map object "mymap" from the quick start guide:
// .setView, has long, lat and zoom level respectively
//setting it to start at 0,0 -> that is the initial lat and long of the center of what we are loading
// the zoom is set to 1 -> no zoom
const mymap = L.map("checkinMap").setView([0, 0], 1);

//attribution requirements, for OpenStreetMap
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//once we have attributions, we create a variable called tiles
//tile layer takes in 2 things, 1 is the url of the tiles themselves:
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// 2 is the attribution! put curly brackets around it, because its expected in the form of an object

const tiles = L.tileLayer(tileUrl, { attribution });

// now that we can create the leaflet tiles, we just need to add them to the "mymap" var to display
tiles.addTo(mymap);

getData();
async function getData() {
  //I can use a different path than /api, but I can reuse the api route because I used it previously as a post, so calling fetch with a get to /api will be handled with a different function in the server itself
  const response = await fetch("/api");
  const data = await response.json();
  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    let txt = `The weather here at ${item.lat}&deg; , ${item.lon}&deg; is ${item["description"]} with a temperature of ${item["fah_Tem"]}&deg; F.`;

    // handling when there is no air quality reading on the user interface
    if (item.air.value < 0) {
      txt += "  No air quality reading.";
    } else {
      txt += `The concentration of particulate matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit} Last Measured ${item.air.lastUpdated}.`;
    }

    console.log(item);

    marker.bindPopup(txt);

    const root = document.createElement("div");
    const mood = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement("img");

    mood.textContent = `mood: ${item.userMood}`;
    geo.textContent = `${item.lat}°, ${item.lon}°`;

    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;

    root.append(mood, geo, date, image);
    document.body.append(root);
  }
  console.log(data);
}
