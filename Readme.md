# Weater App Express 
This is a simple web based weather application that leverages express with NodeJS to call  https://weatherapi.com for detailed weather information about New Zealand airports. 

The markup is taken care of by the PUG templating engine.
***
## Modules you will need

* nodeJS
* express
* node-fetch (We do not need to worry about installing this one, it is accessed asynchronously through the ES Module method.)
* nodemon
* browser-sync

These last two will be used for running the application more easily locally.

***

Install nodemon
```
npm i -D nodemon
```

Install express
```
npm i express
```

Install pug
```
npm i pug
```

Finally we install browser-sync
```
npm i -D browser-sync
```

***
# Running The Weather App

We will need to use two seperate terminal windows to be able to run the app. This is easily done in Visual Studio Code, there is an integrated terminal built right into it. 
You can open it with Ctrl + J. 

In the first terminal run
```
npm run dev
```

In the second terminal run
```
npm run ui
```

This will open up a new browser window with my application.
Enjoy!