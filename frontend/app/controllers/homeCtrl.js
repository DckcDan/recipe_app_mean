(function () {


var HomeController = function(recipeProvider){
	var vm = this;
	vm.message="hello daniel";


	recipeProvider.getRecipeList()
				.then(
					  function(data) {
					 		   vm.done_loading = true;
		               			vm.recipeList = data;
					  },
					  function(error) {
					    vm.page_load_error = "Unexpected error loading recipes: " + status;
					  }
				);


};

//only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

 angular.module("MyRecipeApp").controller("HomeController", HomeController);


})();