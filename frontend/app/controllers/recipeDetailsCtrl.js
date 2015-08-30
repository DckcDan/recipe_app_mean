(function () {



var recipeDetailsController = function($scope,$routeParams,$location,$modal,recipeProvider){

	var vm = this;
	var recipeId = $routeParams.recipeId;


	 recipeProvider.lookUpRecipeById(recipeId)
                    .then(
                        function(data,status,headers,conf){
                               vm.done_loading = true;
                               vm.recipe = data;
                               //this is for the edit mode
                               vm.selectedRecipe = data;
                         },
                        function (payload) {
                              vm.page_load_error = "Sorry Recipe not found";
                         }

                        );



  vm.editRecipe = function(updatedRecipe){

    //selectedRecipe

      recipeProvider.updateRecipe(updatedRecipe._id,updatedRecipe)
        .then(
          function(recipe){
                       vm.edit_recipe_error = '';
                       $location.path("/recipes/" + recipe._id);
            },
              function (recipe, status, headers, conf) {
                         console.log("Error editing recipe name "+recipe.title+".Error "+status)
                     vm.aedit_recipe_error = "Uppss an error has happened, please try again later!!!";
                  });
    
  }


  /**
   * Method to open the review modal screen
   */
   vm.popupReviewForm = function(){

                var modelInstance = $modal.open({
                       templateUrl : 'app/views/modals/review_modal.html',
                       controller : 'reviewModalController as vm', 
                       /*note that modal does not support controllerAs so the 
                         above is the way to define it*/
                        //passing parameters to the modal using resolve
                       resolve : {
                            recipeData : function(){
                               return{
                                    recipeId : vm.recipe._id,
                                    recipeName : vm.recipe.title
                                };
                            }
                       }  
                });

          //when modal promise is resolved.
          modelInstance.result
                        .then(
                            function(data){
                               vm.recipe.reviews.push(data);
                            }

                          );



          };        

	};




 angular.module("MyRecipeApp").controller("recipeDetailsController", recipeDetailsController);


})();