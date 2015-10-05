'use strict';
/* Authentication controller responsible for registration and logging in*/

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    httpHelper = require('./httpHelper'),
    passport = require('passport'),
    User = mongoose.model("User");



/**
 * Check whether the token is valid and exist. If not it will create  a json response with the
 * error.
 NOTE: the code below is being replaced by the use of the passport module.
 */
module.exports.checkIfTokenValid = function (req, res) {

    if (!req.headers.authorization) {
        httpHelper.sendJsonResponse(res, 401, {
            "message": "Authorization is required"
        });
        return;
    };


    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        httpHelper.sendJsonResponse(res, 401, {
            "message": "Authorization has failed, wrong token"
        });
        return;
    };

};
/**
 * Register a new user into the persistence store
 */
module.exports.registerUser = function (req, res) {

    if (!req.body.fullname || !req.body.email || !req.body.password) {
        httpHelper.sendJsonResponse(res, 400, {
            "status": "Missing fields for creating a user " + err
        });
        return;
    }

    var User = buildUser(req);
    //user.save or user.create
    User.save(function (err, user) {
        if (err) {
            httpHelper.sendJsonResponse(res, 400, {
                "status": "Error creating a user - error " + err
            });
        } else {
            httpHelper.sendJsonResponse(res, 201, {
                user: user.toJson(),
                token: user.generateJwt()
            });
        }

    });

};


/**
 * Creates and builds a new model instance of User
 */
var buildUser = function (req) {
    var user = new User();
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.modifiedOn = Date.now();
    user.lastLogin = Date.now();
    //it calls a user schema method to encript the password.
    user.setPassword(req.body.password);

    return user;

};

/**
 * Login a user based on the given credentials
 */
module.exports.authentificateUser = function (req, res) {
    if (!req.body.email || !req.body.password) {
        httpHelper.sendJsonResponse(res, 404, {
            "status": "email address param is required "
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            httpHelper.sendJsonResponse(res, 401, info);
        } else {
            if (user) {
                httpHelper.sendJsonResponse(res, 200, {
                    user: user.toJson(),
                    token: user.generateJwt()
                });
            } else {
                httpHelper.sendJsonResponse(res, 401, info);
            }
        }
        //make the req and res available to passport
    })(req, res);



};