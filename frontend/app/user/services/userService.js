'use strict';

(function () {


    var userProvider = function ($http, $log, $q) {

        /**
         * it processes the registration of the user in the backend
         */
        var registerUser = function (user) {
            var deferred = $q.defer();

            $http.post("/api/v1/users/", user)
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