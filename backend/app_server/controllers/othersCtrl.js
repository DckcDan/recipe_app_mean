/* Others controller */


/*Serves the about page*/
module.exports.about = function(req, res){
 res.render('about', { title: 'About' });
};