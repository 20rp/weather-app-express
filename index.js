
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

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to request on http://localhost:${port}`);
});