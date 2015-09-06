(function () {

    function userProvider($http, $log, $q) {




        /**
         * Register a new user. Sends user registration data to the
         * back end service
         */
        var registerUser = function (userData) {
            var deferred = $q.defer();

            $http.post("/api/v1/users", userData)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        };
    };

    angular.module("MyRecipeApp").service("userProvider", userProvider);
})();