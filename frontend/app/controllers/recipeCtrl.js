(function () {



var recipeController = function($scope,$routeParams,$location,recipeProvider){

	var vm = this;
    vm.newRecipe = {};

	$scope.addRecipe = function(newRecipe){	

		if(!newRecipe){
			 vm.add_recipe_error = "Please complete the recipe details";
			 return;
		}	

		//TODO validate data
		if(!newRecipe.title){
			 vm.add_recipe_error = "Please enter a title";
			return;
		}	
		//TODO remove this once the login service is done
		newRecipe.userId = "55c77a959e73518f1ce6570b";
		
		recipeProvider.addNewRecipe(newRecipe)
				.success(function(recipe){
					     vm.newRecipe = {};
                  		 vm.add_recipe_error = '';
				  		 // now, redirect to the recipe details
                    	$location.path("/recipes/" + recipe._id);
    		 	  })
    		    .error(function (recipe, status, headers, conf) {
                      	 console.log("Error adding a new recipe name "+recipe.title+".Error "+status)
                 		 vm.add_recipe_error = "Uppss an error has happened, please try again later!!!";
               	  });
		
			

	};
};


 angular.module("MyRecipeApp").controller("recipeController", recipeController);

 })();