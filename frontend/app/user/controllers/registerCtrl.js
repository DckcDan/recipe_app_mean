'use strict';
(function () {


    var registerController = function ($scope, userProvider, authTokenProvider, $state, $window,toaster) {
        var vm = this;
        vm.register_form_error = "";
        vm.submit = function () {
            //TODO try not to use $scope
            var user = {
                email: $scope.email,
                fullname: $scope.fullname,
                password: $scope.password
            };
            userProvider.registerUser(user)
                .then(
                    function (data, status, headers, conf) {
                        authTokenProvider.saveToken(data.token);
                        var storage = $window.localStorage;
                        //store user un the localstorage
                        storage.setItem("user", data.user);
                        $state.go("home");
                        toaster.pop('success', "Register", "You have successfully register");
                    },
                    function (error) {
                        vm.register_form_error = "Please correct error ";
                    }
                );
        };
    };



    angular.module("MyRecipeApp").controller("registerController", registerController);


})();