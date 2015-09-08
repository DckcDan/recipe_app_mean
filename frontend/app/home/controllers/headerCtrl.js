(function () {


    var headerController = function ($scope, authTokenProvider) {


        $scope.isAuthenticated = function () {
            return authTokenProvider.isAuthenticated();
        };

    };

    //only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

    angular.module("MyRecipeApp").controller("headerController", headerController);


})();