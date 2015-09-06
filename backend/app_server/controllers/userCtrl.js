'use strict';
/* USer controller */

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'), 
 	UserDAO = mongoose.model("User"),
 	httpHelper = require('./httpHelper');



module.exports.createUser = function(req, res){

UserDAO.create(buildUser(req), function(err, user){
			if(err){
				httpHelper.sendJsonResponse(res,400,{"status":"Error creating a user - error "+err});
			}else{
				httpHelper.sendJsonResponse(res,201,user);
			}

});


var buildUser = function(req){

 	var user = {
 		email : req.body.email,
 		password : UserDAO.setPassword(req.body.password),
 		fullname : req.body.fullName,
 		modifiedOn : Date.now
 	};

 	return user;

};

};
