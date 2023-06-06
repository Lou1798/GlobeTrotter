// Import express 
let express = require('express');

//Import Cors
var cors = require('cors');

// Initialize the app 
let app = express();

app.use(express.json());

//cors
app.use(cors());

// Importing the database model
const Sequelize = require('sequelize');
const db = require('./db.js');

// Creating all the tables defined in agency
//db.sync()
db.sync({alter: true})

let router = require('./routes');
app.use("/api", router);

// Manage bad route
app.use(function (req, res, next) {
    res.status(404).json({"error": "path not found"});
});

 // Launch app to listen to specified port
const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Runnings on ' + process.env.SERVER + port); });