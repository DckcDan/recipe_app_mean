(function () {


    /**
     * Controller responsible for displaying a recipe and handle its recipe reviews.
     */
    var recipeDetailsController = function ($scope, $stateParams, $location, $modal, recipeProvider) {

        var vm = this;
        var recipeId = $stateParams.recipeId;





        /**
         * Returns a recipe based on the given recipe id
         */
        var getRecipeById = function (id) {

            recipeProvider.lookUpRecipeById(id)
                .then(
                    function (recipe, status, headers, conf) {
                        vm.done_loading = true;
                        vm.currentRecipe = recipe;
                    },
                    function (payload) {
                        vm.page_load_error = "Sorry Recipe not found";
                    }

                );

        };



        if (recipeId) {
            //this is for the editmode
            getRecipeById(recipeId);
        }




        /**
         * Method to delete a recipe
         */
        vm.deleteRecipe = function () {

            recipeProvider.deleteRecipe(vm.currentRecipe._id)
                .then(
                    function (recipe) {
                        $location.path("/recipes");
                    },
                    function (recipe, status, headers, conf) {
                        console.log("Error deleting recipe name " + recipe.title + ".Error " + status)
                        vm.recipe_form_error = "Uppss an error has happened, please try again later!!!";
                    });
        };



        /**
         * Method to open the review modal screen
         */
        vm.popupReviewForm = function () {

            var modelInstance = $modal.open({
                templateUrl: 'app/recipe/modals/review_modal.html',
                controller: 'reviewModalController as vm',
                /*note that modal does not support controllerAs so the 
                  above is the way to define it*/
                //passing parameters to the modal using resolve
                resolve: {
                    recipeData: function () {
                        return {
                            recipeId: vm.currentRecipe._id,
                            recipeName: vm.currentRecipe.title
                        };
                    }
                }
            });

            //when modal promise is resolved.
            modelInstance.result
                .then(
                    function (data) {
                        vm.recipe.reviews.push(data);
                    }

                );

        };

    };


    angular.module("MyRecipeApp").controller("recipeDetailsController", recipeDetailsController);


})();