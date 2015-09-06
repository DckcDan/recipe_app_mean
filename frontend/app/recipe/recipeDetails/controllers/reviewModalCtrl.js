(function () {


//$modalInstance AngularJs injects the actual model so we can access to it.
var reviewModalController = function($modalInstance,recipeData,recipeProvider){

	var vm = this;
	vm.add_review_error = "";
	vm.recipeData = recipeData;

	vm.modal = {
			cancel : function(){
				$modalInstance.dismiss('cancel');
			},
			close : function(result){
				$modalInstance.close(result);
			}

	};

	vm.onSubmit = function(){

		console.log(vm.formData);
			if(!vm.formData || !vm.formData.title || !vm.formData.comments){
					vm.add_review_error = "All fields required, please try again";
					return false;
			}else{
				processAddReview(vm.recipeData.recipeId,vm.formData);
			}

		
	};
/**
 * Processes the submition of the review using promises.
 */
var processAddReview =  function(recipeId,reviewData){
	//TODO remove hardcode user id once we have the logged user in place
	var review = {
						userId : 	"55c77a959e73518f1ce6570b",
						title : 	 reviewData.title,
						comments :   reviewData.comments,
						rating :     reviewData.rating
					};
	recipeProvider.addReview(recipeId,review)
					.then(
							function(data){
								//when the review is posted we use the returned data
								//which has the expected format to pass it to the view using
								//the close method.
								vm.modal.close(data);
							},
							function(error){
								vm.add_review_error = "Your review has not been save, please try again."
							}	
						);

		};

	



};


angular.module("MyRecipeApp").controller("reviewModalController", reviewModalController);


})();