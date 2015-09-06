(function () {


var homeController = function(recipeProvider){
	var vm = this;
	vm.message="hello daniel";
	vm.recipeList = {};

	recipeProvider.getRecipeList()
				.then(
					  function(data) {
					 		   vm.done_loading = true;
		               			vm.recipeList = data;
					  },
					  function(error) {
					    vm.page_load_error = "Unexpected error loading recipes: " + error.status;
					  }
				);


};

//only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

 angular.module("MyRecipeApp").controller("homeController", homeController);


})();