var myApp = angular.module("MyRecipeApp", [ "ngRoute", "angularFileUpload", "ngCookies", 'ui.bootstrap' ]);




myApp.config(function ($routeProvider) {
    $routeProvider
         .otherwise( { redirectTo: "/404_page" });
});