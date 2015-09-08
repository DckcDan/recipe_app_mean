(function () {


    var logoutController = function ($scope, authTokenProvider, $state) {

        authTokenProvider.removeToken();
        $state.go("home");

    };

    //only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

    angular.module("MyRecipeApp").controller("logoutController", logoutController);


})();