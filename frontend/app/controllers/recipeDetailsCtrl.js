(function () {



var RecipeDetailsController = function($scope,$routeParams,$location,recipeProvider){

	var vm = this;
	var recipeId = $routeParams.recipeId;

	 recipeProvider.lookUpRecipeById(recipeId)
                    .then(
                        function(data,status,headers,conf){
                               vm.done_loading = true;
                                 vm.recipe = data;
                         },
                        function (payload) {
                            vm.page_load_error = "Sorry Recipe not found";
                         }

                        );

	};




 angular.module("MyRecipeApp").controller("RecipeDetailsController", RecipeDetailsController);


})();