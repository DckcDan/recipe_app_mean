(function () {


    var validateEquals = function () {

        var linker = function (scope, element, attrs, ngModelCtrl) {
            function validateEqual(value) {
                var valid = (value == scope.$eval(attrs.validateEquals));
                ngModelCtrl.$setValidity('equal', valid);
                return valid ? value : undefined;
            }
            ngModelCtrl.$parsers.push(validateEqual);
            ngModelCtrl.$formatters.push(validateEqual);

            scope.$watch(attrs.validateEquals, function () {
                ngModelCtrl.$setViewValue(ngModelCtrl.$viewName);
            });
        };

        return {
            require: 'ngModel',
            link: linker

        };

    };


    angular.module("MyRecipeApp").directive("validateEquals", validateEquals);


})();