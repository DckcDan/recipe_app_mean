'use strict';

(function () {


    var authToken = function ($window) {
        var storage = $window.localStorage;
        var cachedToken;
        var userToken = 'userToken';
        var isAuthenticated = false;

        var authToken = {
            saveToken: function (token) {
                cachedToken = token;
                storage.setItem(userToken, token);
                isAuthenticated = true;
            },
            getToken: function () {
                if (!cachedToken)
                    cachedToken = storage.getItem(userToken);

                return cachedToken;
            },
            isAuthenticated: function () {
                //!!convert to boolean and invert it
                return !!authToken.getToken();
            },
            removeToken: function () {
                cachedToken = null;
                storage.removeItem(userToken);
                isAuthenticated = false;
            }
        }

        return authToken;
    };

    angular.module("customServices").factory("authTokenProvider", authToken);
})();