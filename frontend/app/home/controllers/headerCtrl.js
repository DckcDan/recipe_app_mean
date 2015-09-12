(function () {


    var headerController = function ($scope, authTokenProvider, $window) {

        var vm = this;
        $scope.isAuthenticated = function () {
            return authTokenProvider.isAuthenticated();
        };


        if (authTokenProvider.isAuthenticated()) {
            var storage = $window.localStorage;
            vm.fullName = storage.getItem("user").fullName;
        }


    };

    //only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

    angular.module("MyRecipeApp").controller("headerController", headerController);


})();