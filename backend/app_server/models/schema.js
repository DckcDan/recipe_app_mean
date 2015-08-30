'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * User schema.
 */
var user = {
				fullname: String,
				login: String,
				email: {
					type: String, 
					unique:true
				},
				createdOn: {
					type: Date, 
					required: true,
					default: Date.now}
					,
				modifiedOn: Date,
				lastLogin: Date
				};

var userSchema = new Schema(user);


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



