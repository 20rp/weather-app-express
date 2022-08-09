
/**
 * Required External Modules
 */

const { json } = require("express");
const express = require("express");
const path = require("path");
// Because node-fetch is an ESM only module, we have to import it asynchronously.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

// Array of airport codes
// const airports = ["akl", "wlg", "chc", "zqn", "hlz", "npe"];
var airportCode = "npe";
var apiUrl = "http://api.weatherapi.com/v1/current.json?key=5068a32470324e3b963231912221905&q=" + airportCode + "&aqi=no";

/**
 *  App Configuration
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sets the views folder as a static file location that is cross platform.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

// http://localhost:3000/
app.get("/", (req, res) => {
    // var ap = document.getElementById("airportSelect");
    // var apVal = ap.options[ap.selectedIndex].value;
    res.render("index", { 
        title: "Home",
    });
});

app.get('/post', function (req, res) {
    res.render("post", {
    });
    console.log(res.body);
    res.send(JSON.stringify(res.body));
})

// http://localhost:3000/fetch
app.get("/fetch", (req, res) => {
    fetch(apiUrl)
        .then(res => res.json())
        .then(json => {
            res.render("weather", { 
                apName: `${json.location.name}`,
                apRegion: `${json.location.region}`,
                apLastUp: `${json.current.last_updated}`,
                apTemp: `${json.current.temp_c} °C`,
                apCond: `${json.current.condition.text}`,
                apWind: `${json.current.wind_kph}`,
                apHum: `${json.current.humidity}`,
                apPrecip: `${json.current.precip_mm}`,
             });

        });
});

// app.get("/fetch?ap=", ())

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to request on http://localhost:${port}`);
});