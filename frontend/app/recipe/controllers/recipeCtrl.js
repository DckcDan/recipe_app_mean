(function () {


    /**
     * Controller responsible for recipe CRUD operations.
     */
    var recipeController = function ($scope, $stateParams, $location, $modal, recipeProvider) {

        var vm = this;

        vm.currentRecipe = null;
        vm.editedRecipe = {};

        //TODO this method can be used in a ngrepeat to set the recipe and avoid calling getReciepById
        vm.setCurrentRecipe = function (recipe) {
            vm.currentRecipe = recipe;
            vm.editedRecipe = angular.copy(recipe);
        };


        /** 
         * Returns a recipe based on the given recipe id
         */
        var getRecipeById = function (recipeId) {

            recipeProvider.lookUpRecipeById(recipeId)
                .then(
                    function (data, status, headers, conf) {
                        vm.done_loading = true;
                        //this is for the edit mode
                        vm.setCurrentRecipe(data);
                    },
                    function (payload) {
                        vm.page_load_error = "Sorry Recipe not found";
                    }

                );

        };

        if ($stateParams.recipeId) {
            //this is for the editmode
            getRecipeById($stateParams.recipeId);
        }

        vm.showMessages = function (field) {
            return vm.recipeForm[field].$touched &&
                vm.recipeForm[field].$invalid;
        };

        /**
         * Method to create a new recipe
         */
        vm.createRecipe = function () {

            var newRecipe = vm.editedRecipe;
            if (!newRecipe) {
                vm.add_recipe_error = "Please complete the recipe details";
                return;
            }

            //TODO validate data
            if (!newRecipe.title) {
                vm.add_recipe_error = "Please enter a title";
                return;
            }

            recipeProvider.addNewRecipe(newRecipe)
                .then(
                    function (recipe) {
                        vm.resetForm();
                        vm.add_recipe_error = '';
                        // now, redirect to the recipe details
                        $location.path("/recipes/" + recipe._id);
                    },
                    function (err) {
                        console.log("Error adding a new recipe " + newRecipe.title + ".Error " + err.message)
                        vm.recipe_form_error = "Uppss an error has happened, please try again later!!!";
                    });

        };



        /**
         * Method to update an existing recipe.
         */
        vm.editRecipe = function () {

            var updatedRecipe = vm.editedRecipe;
            recipeProvider.updateRecipe(updatedRecipe._id, updatedRecipe)
                .then(
                    function (recipe) {
                        vm.resetForm();
                        vm.edit_recipe_error = '';
                        $location.path("/recipes/" + recipe._id);
                    },
                    function (recipe, status, headers, conf) {
                        console.log("Error editing recipe name " + recipe.title + ".Error " + status)
                        vm.recipe_form_error = "Uppss an error has happened, please try again later!!!";
                    });

        };


        vm.resetForm = function () {

            vm.currentRecipe = null;
            vm.editedRecipe = {};

            vm.recipeForm.$setPristine;
            vm.recipeForm.$setUntouched;
        };

        vm.cancelEdit = function () {
            vm.resetForm();
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
                            recipeId: vm.recipe._id,
                            recipeName: vm.recipe.title
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


    angular.module("MyRecipeApp").controller("recipeController", recipeController);



})();