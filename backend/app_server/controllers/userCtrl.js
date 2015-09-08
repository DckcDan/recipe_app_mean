'use strict';
/* USer controller */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    httpHelper = require('./httpHelper');

var User = mongoose.model("User");

module.exports.createUser = function (req, res) {

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

}


var buildUser = function (req) {
    var user = new User();
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.modifiedOn = Date.now();
    //it calls a user schema method to encript the password.
    user.setPassword(req.body.password);
    return user;

};