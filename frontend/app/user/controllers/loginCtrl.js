(function () {


    var loginController = function (authTokenProvider, $state, $window, userProvider, toaster) {
        var vm = this;
        vm.login_error = "";

        vm.onSubmit = function (user, isValid) {
            if (isValid) {
                userProvider.loginUser(user).then(onSuccess)
                    .catch(onError)
                    .finally(onCompletion);
            }
        };

        function onSuccess(info) {
            authTokenProvider.saveToken(info.data.token);
            var storage = $window.localStorage;
            //store user un the localstorage
            storage.setItem("user", info.data.user);
            $state.go("home");
            toaster.pop('success', "Logged in", "You have successfully logged in");
        }

        function onError(reason) {
            vm.login_error = "Invalid credentials, please try again!";
        }

        function onCompletion() {
            vm.login.reset();
        }

        vm.reset = function () {
            vm.login.user = {
                email: '',
                password: ''
            };

        };
    };
    //only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

    angular.module("MyRecipeApp").controller("loginController", loginController);


})();