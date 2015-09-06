'use strict';
/* RecipesList controller */

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'), 
 	RecipeDAO = mongoose.model("Recipe"),
 	httpHelper = require('./httpHelper');

		

/**
 * Return a list of all recipes
 */
module.exports.listRecipes = function(req, res){

	var myQuery = RecipeDAO.find();
	myQuery.exec(function(err,recipes){
			if(!err){
				httpHelper.sendJsonResponse(res,200,recipes);
			}else{
				console.log(err);
				httpHelper.sendJsonResponse(res,500,{"status":"something when wrong"});
			}	

	});



};

/**
 * Looks up a recipe by Id.
 */
module.exports.lookupRecipeById = function(req,res){

	if(req.params && req.params.recipeId){
		RecipeDAO
			.findById(req.params.recipeId)
			.exec(function(err,recipe){
					if(recipe){
						httpHelper.sendJsonResponse(res,200,recipe);
					}else{
						if(err){
							httpHelper.sendJsonResponse(res,500,{"error":"Error in looking up a recipe "+err});
					
						}else{
							httpHelper.sendJsonResponse(res,404,{"status":"Recipe not found "+req.params.recipeId});
						}
					
					}
			});
	}else{
		httpHelper.sendJsonResponse(res,404,{"status":"No recipeId provided"});
	}

};




/**
 * Creates a new recipe and insert it in to the DB
 */
module.exports.createRecipe = function(req,res){

	RecipeDAO.create(buildRecipe(req),function(err,recipe){
		if(err){
			httpHelper.sendJsonResponse(res,400,{"status":"Error creating a recipe - error "+err});
		}else{
			httpHelper.sendJsonResponse(res,201,recipe);
		}
	});
};



/**
 * Creates a recipe based on the req body params
 */
var buildRecipe = function(req){
	var recipe = {
		title: req.body.title,
		description: req.body.description, 
		preparationTime: req.body.preparationTime,
		cookingTime: req.body.cookingTime,
		category: req.body.category,
		ingredients: req.body.ingredients,
		preparation: req.body.preparation,
		createdBy: req.body.userId
	};

	return recipe;
	
};


module.exports.deleteRecipe = function(req,res){
	console.log("deleting a recipe "+req.params.recipeId);
	if(req.params && req.params.recipeId){
		RecipeDAO
				.findByIdAndRemove(req.params.recipeId)
				.exec(function(err,recipe){
					if(err){
						httpHelper.sendJsonResponse(res,500,{"status":"Error deleting a recipe - error "+err});
					}else{
						httpHelper.sendJsonResponse(res,204,null);
					}

				});

	}else{
		httpHelper.sendJsonResponse(res,400,{"status":"No recipeId provided"});
	}

};







