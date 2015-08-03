/* Recipe Detail controller */



module.exports.view = function(req, res){
 res.render('recipeDetail', { title: 'Details' });
};


module.exports.addReview = function(req, res){
 res.render('addReview', { title: 'MyReview' });
};


