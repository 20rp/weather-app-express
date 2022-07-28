
/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");

// Because node-fetch is an ESM only module, we have to import it asynchronously.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";
let airportCode = "npe";
let apiUrl = "http://api.weatherapi.com/v1/current.json?key=5068a32470324e3b963231912221905&q=" + airportCode + "&aqi=no";

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

// http://localhost:3000/fetch
app.get("/fetch", (req, res) => {
    fetch(apiUrl)
        .then(res => res.json())
        .then(json => {
            console.log(json.location.name);
        });
});

app.get("/test", (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => {
            console.log("First user in the array:");
            console.log(json[0]);
            console.log("Name of the first user in the array:");
            console.log(json[0].name);
    });
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to request on http://localhost:${port}`);
});