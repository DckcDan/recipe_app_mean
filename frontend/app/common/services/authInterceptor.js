'use strict';

(function () {


    var authInterceptor = function (authTokenProvider) {

        var request = function (config) {
            var token = authTokenProvider.getToken();
            if (token) {
                config.headers.authorization = 'Bearer ' + token;
            }
            return config;

        };

        var response = function (response) {
            return response;
        };

        return {
            request: request,
            response: response
        }
    };

    angular.module("MyRecipeApp").factory("authInterceptor", authInterceptor);
})();