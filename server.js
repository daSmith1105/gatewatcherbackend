//Initiallising node modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// var sql = require("mssql");

// Set up the express app
const app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// App entry. Server setup here.
const http = require('http');

// Log requests to the console
app.use(morgan('dev'));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// Models
const models = require("./models");
// Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(error) {
    console.log(error, "Something went wrong with the Database update!");
});

// Requir routes into the application
require('./routes/index.js')(app);

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

module.exports = app;