var express = require('express');
var router = express.Router();
var mainCtrl = require('../app_server/controllers/main')
var recipeListCtrl = require('../app_server/controllers/recipeListCtrl')
var recipeDetailsCrtl = require('../app_server/controllers/recipeDetailCtrl')
var othersCrtl = require('../app_server/controllers/othersCtrl')


/* URL routes to the different controllers */
router.get('/', mainCtrl.index);
router.get('/recipes', recipeListCtrl.list);
router.get('/addRecipe', recipeListCtrl.addRecipe);
router.get('/recipeDetail', recipeDetailsCrtl.view);
router.get('/addReview', recipeDetailsCrtl.addReview);
router.get('/about', othersCrtl.about);


module.exports = router;
