'use strict';
/* USer controller */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    httpHelper = require('./httpHelper');

var User = mongoose.model("User");

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

    var user = buildUser(req);
    //user.save or user.create
    user.save(function (err, user) {
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
 * Login a user based on the given credentials
 */
module.exports.loginUser = function (req, res) {

    if (!req.body.email) {
        httpHelper.sendJsonResponse(res, 400, {
            "status": "email address param is required "
        });
        return;
    }


    //look for a user based on the email
    var query = User.findOne({
        "email": req.body.email
    });

    query.select('_id password salt');

    query.exec(function (error, user) {
        if (user) {
            if (user.validatePassword(req.body.password)) {
                httpHelper.sendJsonResponse(res, 201, {
                    user: user.toJson(),
                    token: user.generateJwt()
                });
            } else {
                httpHelper.sendJsonResponse(res, 401, {
                    "error": "User credentials are invalid"
                });
            }

        } else {
            httpHelper.sendJsonResponse(res, 404, {
                "error": "User not found, wrong email/password"
            });

        };


    });

};



var buildUser = function (req) {
    var user = new User();
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.modifiedOn = Date.now();
    //it calls a user schema method to encript the password.
    user.setPassword(req.body.password);
    return user;

};