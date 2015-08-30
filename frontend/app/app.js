/**
 * Application module declaration
 */
angular.module("MyRecipeApp", 
	[ 
		'ngRoute', 
		'angularFileUpload',
		'ngCookies',
	    'ui.bootstrap'
	 ]);

/**
 * Application routing definition
 */
angular.module("MyRecipeApp").config(function ($routeProvider) {
    $routeProvider
     	.when("/home", { 
     		controller: "homeController",
     		controllerAs: "vm", 
     		templateUrl: "app/views/home.html" 
     	})
     	.when("/recipes/:recipeId",{
     		controller:"recipeDetailsController",
			controllerAs: "vm", 
     		templateUrl: "app/views/recipe_details.html"  
     	})
		.when("/addrecipe", 
			{ controller: "recipeController", 
			  controllerAs: "vm", 
		   	  templateUrl: "app/views/add_recipe.html" 
		})
		.when("/editrecipe/:recipeId", 
			{ controller: "recipeDetailsController", 
			  controllerAs: "vm", 
		   	  templateUrl: "app/views/edit_recipe.html" 
		})
		.when("/search", 
			{ controller: "searchController", 
			  controllerAs: "vm", 
		   	  templateUrl: "app/views/search.html" 
		})
	    .when("/", { redirectTo: "/home" })
        .otherwise( { redirectTo: "/home" });
});


/**
 * Application directives definition
 */
//<div rating-stars></div> HTML is not sensitive case, uppercase letter are converted
//to a lowercase  and prefixed by a dash//
//rating-stars snake  case

var ratingStars = function(){

	return{
		//link: it allows to manipulate the dom via a function
		restrict : "A",
		replace : false,
		scope : {
			thisRating : "=value"
		},
		templateUrl: "/app/views/directives/rating_stars.html"
	};



};
angular.module("MyRecipeApp").directive("ratingStars",ratingStars);


/**
 * Recipe directives. This directives is used in several pages to enforce reusability.
 */

var recipe = function(){
	//function to manipulate DOM
	var linker = function(scope,element,attrs){
			console.log(element);
			//attach functions for instance onclick to the element
	};
	//function to deal with events in the directive. This can be in the page controller
	//but for testability is better here
	var controller = function($scope){
			$scope.sayHello = function(recipeId){
					console.log("Helllo "+recipeId);
			}
	};

	return{
		linker: linker,
		controller: controller,
		restrict : "E",
		templateUrl: "/app/views/directives/recipe.html"

	};

};
//represent a recipe form for adding or editing a recipe
var recipeForm = function(){

	return{
		restrict : "E",
		scope : {
			recipe : "=value"
		},
		templateUrl: "/app/views/directives/recipe-form.html"
	};

};
angular.module("MyRecipeApp").directive("recipe",recipe);
angular.module("MyRecipeApp").directive("recipeForm",recipeForm);


/**
 * Recipe directives. This directives is used in several pages to enforce reusability.
 */

var review = function(){
	return{
		restrict : "E",
		templateUrl: "/app/views/directives/review.html"
};

};

angular.module("MyRecipeApp").directive("review",review);

