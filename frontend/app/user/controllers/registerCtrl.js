'use strict';
(function () {


    var registerController = function ($scope, userProvider, authTokenProvider, $state) {
        var vm = this;

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
                        vm.userFullName = data.user.fullname;
                        $state.go("home");
                    },
                    function (error) {

                    }
                );
        };
    };



    angular.module("MyRecipeApp").controller("registerController", registerController);


})();