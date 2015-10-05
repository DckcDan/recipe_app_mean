
'use strict';
/* Recipe Detail controller */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    RecipeDAO = mongoose.model("Recipe"),
    httpHelper = require('./httpHelper');


/**
 * Updates the content of a recipe using the request body content
 */
module.exports.updateRecipe = function (req, res) {

        if (!req.params.recipeId) {
            httpHelper.sendJsonResponse(res, 400, {
                "status": "recipeId param not found "
            });
            return;
        }
        RecipeDAO
            .findById(req.params.recipeId)
            .select("-reviews -rating")
            .exec(function (err, recipe) {
                if (err) {
                    httpHelper.sendJsonResponse(res, 500, {
                        "status": "Error getting a recipe - error " + err
                    });
                } else {
                    if (recipe) {
                        updateRecipeContent(req, recipe);
                        recipe.save(function (err, recipe) {
                            if (recipe) {
                                httpHelper.sendJsonResponse(res, 201, recipe);
                            } else {
                                httpHelper.sendJsonResponse(res, 500, {
                                    "status": "Error updating recipe " + req.params.recipeId
                                });
                            }
                        })
                    } else {
                        httpHelper.sendJsonResponse(res, 404, {
                            "status": "Recipe not found " + req.params.recipeId
                        });
                    }

                }


            });


    }
    /**
     * Updates the request body fields into a recipe
     */
var updateRecipeContent = function (req, recipe) {

    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.preparationTime = req.body.preparationTime;
    recipe.cookingTime = req.body.cookingTime;
    recipe.category = req.body.category;
    recipe.ingredients = req.body.ingredients;
    recipe.preparation = req.body.preparation;

};