'use strict';

(function () {


    var userProvider = function ($http, $log, $q, API_URL) {

        /**
         * it processes the registration of the user in the backend
         */
        var registerUser = function (user) {
            var deferred = $q.defer();

            $http.post(API_URL + "/users/", user)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;


        }

        return {
            registerUser: registerUser
        };

    };




    angular.module("MyRecipeApp").service("userProvider", userProvider);
})();