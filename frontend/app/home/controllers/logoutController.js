(function () {


    var logoutController = function ($scope, authTokenProvider, $state, $window) {
        var storage = $window.localStorage;
        authTokenProvider.removeToken();
        $state.go("home");
        storage.removeItem("user");
    };

    //only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

    angular.module("MyRecipeApp").controller("logoutController", logoutController);


})();