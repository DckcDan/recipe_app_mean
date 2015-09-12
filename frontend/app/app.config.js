'use strict';

/**
 * Application routing definition using angular ui-router for using states
 */
angular.module("MyRecipeApp").config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider


            .state('home', {
            url: "/home",
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "app/home/partials/home.html"
        })

        .state('addRecipe', {
            url: "/recipes/add",
            controller: "recipeController",
            controllerAs: "vm",
            templateUrl: "app/recipe/partials/recipe.html"
        })

        .state('editRecipe', {
                url: "/recipes/:recipeId/edit",
                controller: "recipeController",
                controllerAs: "vm",
                templateUrl: "app/recipe/partials/recipe.html"
            })
            .state('recipes', {
                url: "/recipes/:recipeId",
                controller: "recipeDetailsController",
                controllerAs: "vm",
                templateUrl: "app/recipe/partials/recipe_details.html"
            })
            .state('search', {
                url: "/search",
                controller: "searchController",
                controllerAs: "vm",
                templateUrl: "app/recipe/partials/search.html"
            })
            .state('register', {
                url: "/register",
                controller: "registerController",
                controllerAs: "vm",
                templateUrl: "app/user/partials/register.html"
            })
            .state('logout', {
                url: "/logout",
                controller: "logoutController",
                controllerAs: "vm",
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.when('/', '/home');
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push("authInterceptor");

    })
    //TODO the api url should have the full URL 192.../
    .constant('API_URL', '/api/v1');