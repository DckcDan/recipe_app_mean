'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


//setting up the passport strategey and overwritte the username field
var stragegy = new LocalStrategy({
        userNameField: 'email'
    },
    function (username, password, done) {

        User.findOne({
            email: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email address.'
                });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, user);

        });


    });



passport.use(stragegy);