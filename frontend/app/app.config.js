'use strict';

/**
 * Application routing definition using angular ui-router for using states
 */
angular.module("MyRecipeApp").config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider


        .state('home', {
        url: "/home",
        controller: "homeController",
        controllerAs: "vm",
        templateUrl: "app/home/partials/home.html"
    })

    .state('recipes', {
        url: "/recipes/:recipeId",
        controller: "recipeDetailsController",
        controllerAs: "vm",
        templateUrl: "app/recipe/recipeDetails/partials/recipe_details.html"
    })

    .state('addRecipe', {
        url: "/recipes/add",
        controller: "recipeController",
        controllerAs: "vm",
        templateUrl: "app/recipe/manageRecipe/partials/recipe.html"
    })

    .state('editRecipe', {
        url: "/recipes/:recipeId/edit",
        controller: "recipeController",
        controllerAs: "vm",
        templateUrl: "app/recipe/manageRecipe/partials/recipe.html"
    })

    .state('search', {
            url: "/search",
            controller: "searchController",
            controllerAs: "vm",
            templateUrl: "app/recipe/manageRecipe/partials/search.html"
        })
        .state('register', {
            url: "/register",
            controller: "registerController",
            controllerAs: "vm",
            templateUrl: "app/user/register/partials/register.html"
        })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.when('/', '/home');

    $urlRouterProvider.otherwise('/');

});