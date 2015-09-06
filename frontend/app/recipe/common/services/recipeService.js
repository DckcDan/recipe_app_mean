(function () {

    function recipeProvider ($http,$log, $q) {


        /**
         * Returns a complete list with all the recipes.
         */
    	var recipeList = function(){
            var deferred = $q.defer();
            //var url= baseUrl+"/api/v1/recipes/"
              $http.get("/api/v1/recipes/")
                    .success(function(data){
                        deferred.resolve(data);
                 })
                    .error(function(msg,code){
                        deferred.reject(msg);
                         $log.error(msg, code);
                 });

             return deferred.promise;
        };

        /**
         * It looks up a recipe by its id.
         */
        var lookUpRecipeById = function(recipeId){            
             var deferred = $q.defer();

            $http.get("/api/v1/recipes/"+recipeId)
                    .success(deferred.resolve)
                    .error(deferred.reject);



            return deferred.promise;
      };

        /**
         * Adds a new recipe to the datastore.
         */
        var addNewRecipe = function(newRecipe){
            var deferred = $q.defer();

            $http.post("/api/v1/recipes",newRecipe)
                    .success(deferred.resolve)
                    .error(deferred.reject);

            return deferred.promise;
        };   


    /**
     * Updates an exiting recipe in the datastore.
     */
        var updateRecipe = function(recipeId,updatedRecipe){
            var deferred = $q.defer();

            $http.put("/api/v1/recipes/"+recipeId,updatedRecipe)
                    .success(deferred.resolve)
                    .error(deferred.reject);

            return deferred.promise;
        }; 


    /**
     * Deletes an exiting recipe in the datastore.
     */
        var deleteRecipe = function(recipeId){
            var deferred = $q.defer();

            $http.delete("/api/v1/recipes/"+recipeId)
                    .success(deferred.resolve)
                    .error(deferred.reject);

            return deferred.promise;

        }
    /**
     * Adds a review to an existing receipt.
     */
     var addReview = function(recipeId,review){
        var deferred = $q.defer();

        $http.post("/api/v1/recipes/"+recipeId+"/reviews",review) 
                    .success(deferred.resolve)
                    .error(deferred.reject);

         return deferred.promise;    
     };


        return{
            getRecipeList : recipeList,
            lookUpRecipeById : lookUpRecipeById,
            addNewRecipe : addNewRecipe,
            addReview : addReview,
            updateRecipe : updateRecipe,
            deleteRecipe : deleteRecipe
        }


    };

   angular.module("MyRecipeApp").service("recipeProvider", recipeProvider);
})();

 