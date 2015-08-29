'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_server/models/db')
var routesAPI = require('./routes/index');
var _port = 8082;
var app = express();

// view engine setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//it points to our angular web application
app.use(express.static(__dirname + "/../frontend"));

app.use('/api/v1', routesAPI);


module.exports = app;

console.error("Starting Server.");
app.listen(_port);

