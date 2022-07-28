
/**
 * Required External Modules
 */

const { json } = require("express");
const express = require("express");
const path = require("path");
const pug = require("pug");

// Because node-fetch is an ESM only module, we have to import it asynchronously.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";
const templateCompiler = pug.compileFile("views/weather.pug");

// Array of airport codes
const airports = ["akl", "wlg", "chc", "zqn", "hlz", "npe"];
var airportCode = "npe";
var apiUrl = "http://api.weatherapi.com/v1/current.json?key=5068a32470324e3b963231912221905&q=" + airportCode + "&aqi=no";

/**
 *  App Configuration
 */

// Sets the views folder as a static file location that is cross platform.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

// http://localhost:3000/
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/test", (req, res) => {
    console.log(templateCompiler( { name: 'Arlo' }));
})

// http://localhost:3000/fetch
app.get("/fetch", (req, res) => {
    console.log();
    fetch(apiUrl)
        .then(res => res.json())
        .then(json => {
            console.log(json.location.name);
            console.log(json.location.region);
            console.log(json.current.last_updated);
            console.log(json.current.temp_c);
            console.log(json.current.condition.text);
            console.log(json.current.wind_kph);
            console.log(json.current.humidity);
            console.log(json.current.precip_mm);
            res.render("weather", { title: `${json.location.name}` })
        });
});

// app.get("/fetch?ap=", ())

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to request on http://localhost:${port}`);
});