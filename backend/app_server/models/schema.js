'use strict';
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * User schema.
 */
var user = {
				fullname: String,
				email: {
					type: String, 
					unique:true
				},
				createdOn: {
					type: Date, 
					required: true,
					default: Date.now
				},
				password: {
					type : String,
					required: true,
				},
				modifiedOn: Date,
				lastLogin: Date,
				salt : String
			};

var userSchema = new Schema(user);

//Encrypts a user password using HASH and salt
userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.password = crypto.pbkb2Sync(password,this.salt,1000,64).toString('hex');
};

userSchema.methods.validatePassword = function(password){
	var hash = crypto.pbkb2Sync(password,this.salt,1000,64).toString('hex');
	return this.password == hash;
};


/**
 * Review schema.
 */	
var review = {
				//using population to relate schemas
				createdBy : {
					type: Schema.Types.ObjectId, 
					ref: 'User'
				},
				createdOn:{
					type: Date, required: true,
					default:Date.now
				},
				title:{
					type: String, 
					required: true
				},
				comments:{
					type: String, 
					required: true
				},
				rating:{
					type: Number, 
					"default": 0
				}
			};

var reviewSchema = new Schema(review);

/**
 * Recipe schema.
 */	
var recipe = {
				title : {
					type: String, 
					required: true,
					index: 'recipeName',
					unique:true
				},
				description : {
					type: String, 
					required: true
				},
				preparationTime:{
					type: Number, 
					required: true
				},
				cookingTime:{
					type: Number, 
					required: true
				},
				category:{
					type: String, 
					required: true
				},
				ingredients:{
					type: [String], 
					required: true
				},
				preparation:{
					type: String, 
					required: true
				},
				rating: {
					type: Number, 
					"default": 0
				},
				//using population to relate schemas
				createdBy : {
					type: Schema.Types.ObjectId, 
					ref: 'User',
					required: true
				},
				createdOn:{
					type: Date, 
					required: true, 
					default: Date.now
				},
				modifiedOn:{
					type:Date
				},
				//using nested schema or subdocument		
				reviews:{
					type:[reviewSchema]
				}
			};

var recipeSchema = new Schema(recipe);

/**
 * Creation of the various model.
 */	
//Below mongoose compile the schema resulting in the mode, the model is a compiled version
//of the schema
//the model acts as a DAO to perform CRUD operations
mongoose.model('Recipe', recipeSchema,'recipes');
//by default the collection name is the lower case and pluralized of the Mode (User)
mongoose.model('User', userSchema);
//Review is a nested schema or subdocument to the parent Recipe schema. If a schema is only use by the parent, this
//needs to be a subdocument, that's the rule.
mongoose.model('Review', reviewSchema);



