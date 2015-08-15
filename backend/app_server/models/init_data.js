var mongoose = require('mongoose');

//inserting test data
var UserM = mongoose.model('User');


var newUser = new UserM({
			name: "Dan",
			email: "dan@myrecipe.com",			
		});

newUser.save(function(err,user){	
			if(!err){
				console.log("Saved user "+user.name);
			}else{
				console.log(err);
			}	
		});

 newUser = new UserM({
			name: "Yom",
			email: "yom@myrecipe.com",			
		});
newUser.save(function(err,user){	
			if(!err){
				console.log("Saved user "+user.name);
			}else{
				console.log(err);
			}	
		});


var RecipeM = mongoose.model('Recipe'); 



var recipeNew = new RecipeM({
				title : "Spelt bread",
				preparationTime:1,
				cookingTime:2,
				category:"Bread",
				ingredients:"Spelt flour",
				preparation:"First thing to go is mix the flour and eggs",
				createdBy : newUser.id
			});

recipeNew.save(function(err,recipe){	
			if(!err){
				console.log("Saved recipe "+recipe.title);
			}else{
				console.log(err);
			}	
		});

recipeNew = new RecipeM({
				title : "Rye bread",
				preparationTime:1,
				cookingTime:2,
				category:"Bread",
				ingredients:"Rye flour",
				preparation:"First thing to go is mix the flour and eggs",
				createdBy : newUser.id
			});

recipeNew.save(function(err,recipe){	
			if(!err){
				console.log("Saved recipe "+recipe.title);
			}else{
				console.log(err);
			}	
		});

recipeNew = new RecipeM({
				title : "Oat bread",
				preparationTime:1,
				cookingTime:2,
				category:"Bread",
				ingredients:"Oat flour",
				preparation:"First thing to go is mix the flour and eggs",
				createdBy : newUser.id
			});

recipeNew.save(function(err,recipe){	
			if(!err){
				console.log("Saved recipe "+recipe.title);
			}else{
				console.log(err);
			}	
		}); 

