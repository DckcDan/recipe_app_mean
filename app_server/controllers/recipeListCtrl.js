/* RecipesList controller */


/*Serves the recipeList page*/
module.exports.list = function(req, res){
 res.render('recipeList', { title: 'List of recipes' });
};

/*Serves the recipeDetail page*/
module.exports.addRecipe = function(req, res){
 res.render('addRecipe', { title: 'Add a recipe' });
};