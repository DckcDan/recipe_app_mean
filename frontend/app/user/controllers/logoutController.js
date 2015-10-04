(function () {


    var logoutController = function (authTokenProvider, $state, $window, toaster) {
        var storage = $window.localStorage;
        authTokenProvider.removeToken();
        storage.removeItem("user");
        $state.go("home");
        toaster.pop('success', "Logged out", "You have successfully logged out");
    };

    //only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

    angular.module("MyRecipeApp").controller("logoutController", logoutController);


})();