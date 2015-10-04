'use strict';

(function () {


    var userProvider = function ($http, $log, $q, API_URL) {

        /**
         * it processes the registration of the user in the backend.
         Note it creates a promise although the http returns one, this is just 
         for the sake of the example
         */
        var registerUser = function (user) {
            var deferred = $q.defer();

            $http.post(API_URL + "/users/", user)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        };


        /**
         * it processes the user login
         */
        var loginUser = function (user) {

            return $http.post(API_URL + "/users/login", {
                email: user.email,
                password: user.password
            });
        };

        return {
            registerUser: registerUser,
            loginUser: loginUser
        };

    };




    angular.module("customServices").service("userProvider", userProvider);
})();