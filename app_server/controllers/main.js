
//module.export allows you to export a function to other modules that the use the require clause.


/*Serves the homepage*/
module.exports.index = function(req, res){
 res.render('index', { title: 'Express' });
};