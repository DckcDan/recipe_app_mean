
/**
 * Application module declaration
 */
angular.module("MyRecipeApp", 
	[ 
		"ngRoute", 
		"angularFileUpload",
		"ngCookies",
	    "ui.bootstrap"
	 ]);

/**
 * Application routing definition
 */
angular.module("MyRecipeApp").config(function ($routeProvider) {
    $routeProvider
     	.when("/home", { 
     		controller: "HomeController",
     		controllerAs: "vm", 
     		templateUrl: "app/views/home.html" 
     	})
     	.when("/recipes/:recipeId",{
     		controller:"RecipeDetailsController",
			controllerAs: "vm", 
     		templateUrl: "app/views/recipe_details.html"  
     	})
		.when("/addrecipe", 
			{ controller: "RecipeController", 
			  controllerAs: "vm", 
		   	  templateUrl: "app/views/add_recipe.html" 
		})
		.when("/search", 
			{ controller: "SearchController", 
			  controllerAs: "vm", 
		   	  templateUrl: "app/views/search.html" 
		})
	    .when("/", { redirectTo: "/home" })
        //.when("/404_page", { controller: "Controller404", templateUrl: "app/partials/404_page_partial.html" })
         .otherwise( { redirectTo: "/404_page" });
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
 * Recipe directives. This directives is used in several pages. Reusability.
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

angular.module("MyRecipeApp").directive("recipe",recipe);


