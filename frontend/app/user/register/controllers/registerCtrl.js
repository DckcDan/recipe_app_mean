(function () {


    var registerController = function ($scope, userProvider) {
        var vm = this;

        vm.submit = function () {

            userProvider.registerUser()
                .then(
                    function (data, status, headers, conf) {

                    },
                    function (error) {

                    }
                );
        };
    };



    angular.module("MyRecipeApp").controller("registerController", registerController);


})();