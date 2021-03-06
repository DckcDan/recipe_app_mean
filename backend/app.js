'use strict';
/**
 * Module dependencies.
 */
//load the enviroment file called .env
require('dotenv').load();
var express = require('express');
var passport = require('passport');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_server/models/db');
require('./app_server/config/passport');
var routesAPI = require('./routes/index');
var _port = 8082;


//creating an express app
var app = express();

// view engine setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//passport init
app.use(passport.initialize());


//it points to our angular web application
app.use(express.static(__dirname + "/../frontend"));

app.use('/api/v1', routesAPI);

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Catch unathorized error by the Middleware
app.use(function (err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});


module.exports = app;


var server = app.listen(_port, function () {
    console.log("Server listening on " + server.address().port);
});