'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var recipeListCtrl = require('../app_server/controllers/recipeListCtrl');
var reviewCtrl = require('../app_server/controllers/reviewCtrl');
var recipeDetailsCtrl = require('../app_server/controllers/recipeDetailsCtrl');
var userCtrl = require('../app_server/controllers/userCtrl');


/**
 * URL routes to the different controllers.
 * Routes maps the incoming request to the appropiate controllers.
 */


/**
 * recipes dispatchers handlers.
 */
router.get('/recipes', recipeListCtrl.listRecipes);
router.get('/recipes/:recipeId', recipeListCtrl.lookupRecipeById);
router.post('/recipes', recipeListCtrl.createRecipe);

router.delete('/recipes/:recipeId', recipeListCtrl.deleteRecipe);
router.put('/recipes/:recipeId', recipeDetailsCtrl.updateRecipe);

/**
 * review dispatchers handlers.
 */

router.get('/recipes/:recipeId/reviews', reviewCtrl.listReviews);
router.get('/recipes/:recipeId/reviews/:reviewId', reviewCtrl.lookupReviewById);
router.post('/recipes/:recipeId/reviews', reviewCtrl.createReview);
//router.put('/recipes/:recipeId/reviews/:reviewId', recipeDetailsCtrl.updateReview);
//router.delte('/recipes/:recipeId/reviews/:reviewId', recipeDetailsCtrl.updateReview);



/**
 * user dispatchers handlers.
 */
router.post('/users', userCtrl.createUser);


/**
 * exports routes.
 */
module.exports = router;