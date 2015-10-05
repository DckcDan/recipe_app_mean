'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
/*Middleware configuration: specify the secret and the name of the property we want to add to the req object
to hold the payload*/
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
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
router.post('/recipes', auth, recipeListCtrl.createRecipe);

router.delete('/recipes/:recipeId', auth, recipeListCtrl.deleteRecipe);
router.put('/recipes/:recipeId', auth, recipeDetailsCtrl.updateRecipe);

/**
 * Review dispatchers handlers.
 */
router.get('/recipes/:recipeId/reviews', reviewCtrl.listReviews);
router.get('/recipes/:recipeId/reviews/:reviewId', reviewCtrl.lookupReviewById);
router.post('/recipes/:recipeId/reviews', auth, reviewCtrl.createReview);


/**
 * AuthenticationCtrl  dispatchers handlers.
 */
router.post('/users', authenticationCtrl.registerUser);
router.post('/users/login', authenticationCtrl.authentificateUser);

/**
 * exports routes.
 */
module.exports = router;