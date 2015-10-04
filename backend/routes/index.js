'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var recipeListCtrl = require('../app_server/controllers/recipeListCtrl');
var reviewCtrl = require('../app_server/controllers/reviewCtrl');
var recipeDetailsCtrl = require('../app_server/controllers/recipeDetailsCtrl');
var authenticationCtrl = require('../app_server/controllers/authenticationCtrl');


/**
 * URL routes to the different controllers.
 * Routes maps the incoming request to the appropiate controllers.
 */


/**
 * Recipes dispatchers handlers.
 */
router.get('/recipes', recipeListCtrl.listRecipes);
router.get('/recipes/:recipeId', recipeListCtrl.lookupRecipeById);
router.post('/recipes', recipeListCtrl.createRecipe);

router.delete('/recipes/:recipeId', recipeListCtrl.deleteRecipe);
router.put('/recipes/:recipeId', recipeDetailsCtrl.updateRecipe);

/**
 * Review dispatchers handlers.
 */
router.get('/recipes/:recipeId/reviews', reviewCtrl.listReviews);
router.get('/recipes/:recipeId/reviews/:reviewId', reviewCtrl.lookupReviewById);
router.post('/recipes/:recipeId/reviews', reviewCtrl.createReview);


/**
 * AuthenticationCtrl  dispatchers handlers.
 */
router.post('/users', authenticationCtrl.registerUser);
router.post('/users/login', authenticationCtrl.authentificateUser);

/**
 * exports routes.
 */
module.exports = router;