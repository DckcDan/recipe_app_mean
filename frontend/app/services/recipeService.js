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
         * It looks up a recipe by its id
         */
        var lookUpRecipeById = function(recipeId){            
          
            var deferred = $q.defer();

            $http.get("/api/v1/recipes/"+recipeId)
                    .success(deferred.resolve)
                    .error(deferred.reject);



            return deferred.promise;
      };

        /**
         * Adds a new recipe to the datastore
         */
        var addNewRecipe = function(newRecipe){


            var deferred = $q.defer();

            $http.post("/api/v1/recipes",newRecipe)
                    .success(deferred.resolve)
                    .error(deferred.reject);

            return deferred.promise;
        };        

        return{
            getRecipeList : recipeList,
            lookUpRecipeById : lookUpRecipeById,
            addNewRecipe : addNewRecipe
        }


    };

   angular.module("MyRecipeApp").service("recipeProvider", recipeProvider);
})();

 