//Initiallising node modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads' )
    },
    filename: function (req, file, cb) {
      if(file.originalname == 'lp.jpg') {
        cb(null,  'lp-' + Date.now() + '.jpg')
      } else {
        cb(null,  'load-' + Date.now() + '.jpg')
      }
    }
  })
  
  var upload = multer({ storage: storage });

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

app.use(express.static(path.join(__dirname, "uploads")));

// Models
const models = require("./models");
// Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(error) {
    console.log(error, "Something went wrong with the Database update!");
});

// Route for uploading images
app.post('/api/upload', upload.single("file"), function(req, res) {
    res.send(req.file);
    console.log("file = ", req.file);
});

// Route for retrieving images
app.get('/api/download/:file', function (req, res, next) {
    const file = req.params.file;
    res.download(path.join( __dirname, 'uploads/', file ));
});

// Require routes into the application
require('./routes/index.js')(app);

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);

// const io = require('socket.io').listen(server);

// io.set("origins", "*:*");

// io.sockets.on('connection', function(socket) {
//     console.log('A client is connected!');

//     io.sockets.emit("new event added", "hello world");
// })

server.listen(port);

module.exports = app;