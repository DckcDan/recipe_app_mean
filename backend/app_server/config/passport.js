'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


//setting up the passport strategey and overwritte the username field
var stragegy = new LocalStrategy({
        //this is the field from the req.body. Passport expect by default a field called username.
        //the below overwrittes the expect it field
        usernameField: 'email'
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
                    message: 'Incorrect details.'
                });
            }
            if (user.validatePassword(password)) {
                //user credentials are correc.
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Incorrect details."
                });
            }


        });


    });



passport.use(stragegy);