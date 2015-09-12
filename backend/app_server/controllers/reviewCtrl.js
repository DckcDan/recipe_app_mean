'use strict';
/* Review controller */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    RecipeDAO = mongoose.model("Recipe"),
    httpHelper = require('./httpHelper');



/**
 * List all the reviews for the given recipe
 */
module.exports.listReviews = function (req, res) {

    if (req.params && req.params.recipeId) {
        RecipeDAO
            .findById(req.params.recipeId)
            .exec(function (err, recipe) {
                if (recipe) {
                    httpHelper.sendJsonResponse(res, 200, recipe.reviews);
                } else {
                    if (err) {
                        httpHelper.sendJsonResponse(res, 500, {
                            "error": "Error in listing reviews " + err
                        });

                    } else {
                        httpHelper.sendJsonResponse(res, 404, {
                            "status": "Review not found " + req.params.recipeId
                        });
                    }

                }
            });
    } else {
        httpHelper.sendJsonResponse(res, 400, {
            "status": "No recipeId provided"
        });
    }

};



/**
 * Looks up a review by Id.
 */
module.exports.lookupReviewById = function (req, res) {

    if (req.params && req.params.recipeId) {
        RecipeDAO
            .findById(req.params.recipeId)
            //just returning the reviews from the recipe object
            .select("_id, reviews")
            .exec(function (err, recipe) {
                if (recipe) {
                    var review;
                    //the id method will return a single matching subdocument
                    review = recipe.reviews.id(req.params.reviewId);
                    if (review && review.length > 0) {
                        var response = buildReviewResponse(recipe, review);
                        httpHelper.sendJsonResponse(res, 200, response);
                    } else {
                        httpHelper.sendJsonResponse(res, 404, {
                            "status": "ReviewId not found " + req.params.reviewId
                        });
                    }

                } else {
                    if (err) {
                        httpHelper.sendJsonResponse(res, 500, {
                            "error": "Error in looking up a recipe " + err
                        });

                    } else {
                        httpHelper.sendJsonResponse(res, 404, {
                            "status": "Recipe not found " + req.params.recipeId
                        });
                    }

                }
            });
    } else {
        httpHelper.sendJsonResponse(res, 404, {
            "status": "No recipeId provided"
        });
    }

};

/**
 * Creates a custom response with the required data for a review.
 */
var buildReviewResponse = function (recipe, review) {
    var response;
    response = {
        recipe: {
            title: recipe.title,
            id: recipe.id
        },
        review: review
    }
};


/**
 * Adds a review to an existing recipe and persist it.
 */
module.exports.createReview = function (req, res) {
    var recipeId = req.params.recipeId;
    //Note if the value passed to findById is undefined, it will return the first entry.
    if (recipeId) {
        RecipeDAO
            .findById(recipeId)
            .select("rating reviews")
            .exec(function (err, recipe) {

                if (err) {
                    httpHelper.sendJsonResponse(res, 500, {
                        "status": "Error getting a recipe - error " + err
                    });
                } else {
                    if (recipe) {
                        addReviewToRecipe(req, res, recipe);
                    } else {
                        httpHelper.sendJsonResponse(res, 404, {
                            "status": "Recipe not found " + req.params.recipeId
                        });
                    }

                }

            });
    } else {
        httpHelper.sendJsonResponse(res, 404, {
            "status": "No recipeId provided"
        });
    }
};

/**
 * Adds a review to an existing recipe
 */
var addReviewToRecipe = function (req, res, recipe) {

    var review = buildReview(req);
    console.log(review);
    recipe.reviews.push(review);
    recipe.rating = calculateAverageRanting(recipe);
    //now the parent document needs to be saved with the new review
    //the model object has a save method to persist the document
    recipe.save(function (err, recipe) {
        if (err) {
            httpHelper.sendJsonResponse(res, 500, {
                "status": "Error saving a review - error " + err
            });
        } else {
            if (recipe) {
                var thisReview = recipe.reviews[recipe.reviews.length - 1];
                httpHelper.sendJsonResponse(res, 201, thisReview);
            } else {
                httpHelper.sendJsonResponse(res, 500, {
                    "status": "Error saving a review  ranting- error " + err
                });
            }
        }

    });

};

/**
 * Creates a review based on the req body params
 */
var buildReview = function (req) {
    var review = {
        createdBy: req.body.userId,
        comments: req.body.comments,
        rating: req.body.rating,
        title: req.body.title
    };

    return review;
};


/**
 * Calculates the average rating for the given recipe
 */
var calculateAverageRanting = function (recipe) {
    var reviewCount = recipe.reviews.length;
    var ratingSum = 0;
    console.log("count" + reviewCount);
    for (var i = 0; i < reviewCount; i++) {
        ratingSum = recipe.reviews[i].rating + ratingSum;
    }

    var ratingAverage = 0;
    if (reviewCount > 0) {
        ratingAverage = parseInt(ratingSum / reviewCount, 10);
    }

    return ratingAverage;
};