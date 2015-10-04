'use strict';
/**
 * Application module declaration
 */
angular.module("MyRecipeApp", [
		'ui.router',
		'angularFileUpload',
		'ngMessages',
	    'ui.bootstrap',
        'ngAnimate',
        'customServices',
        'toaster'
	 ]);
//TODO where can I define it?
angular.module("customServices", []);


/**
 * Application directives definition
 */
//<div rating-stars></div> HTML is not sensitive case, uppercase letter are converted
//to a lowercase  and prefixed by a dash//
//rating-stars snake  case

var ratingStars = function () {

    return {
        //link: it allows to manipulate the dom via a function
        restrict: "A",
        replace: false,
        scope: {
            thisRating: "=value"
        },
        templateUrl: "/app/common/directives/rating_stars.html"
    };



};
angular.module("MyRecipeApp").directive("ratingStars", ratingStars);


/**
 * Recipe directives. This directives is used in several pages to enforce reusability.
 */

var recipe = function () {
    //function to manipulate DOM
    var linker = function (scope, element, attrs) {
        console.log(element);
        //attach functions for instance onclick to the element
    };
    //function to deal with events in the directive. This can be in the page controller
    //but for testability is better here
    var controller = function ($scope) {
        $scope.sayHello = function (recipeId) {
            console.log("Helllo " + recipeId);
        }
    };

    return {
        linker: linker,
        controller: controller,
        restrict: "E",
        templateUrl: "/app/common/directives/recipe.html"

    };

};
//represent a recipe form for adding or editing a recipe
var recipeForm = function () {

    return {
        restrict: "E",
        scope: {
            recipe: "=value"
        },
        templateUrl: "/app/common/directives/recipe_form.html"
    };

};
angular.module("MyRecipeApp").directive("recipe", recipe);
angular.module("MyRecipeApp").directive("recipeForm", recipeForm);


/**
 * Recipe directives. This directives is used in several pages to enforce reusability.
 */

var review = function () {
    return {
        restrict: "E",
        templateUrl: "/app/recipe/directives/review.html"
    };

};

angular.module("MyRecipeApp").directive("review", review);