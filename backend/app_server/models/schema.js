var mongoose = require('mongoose');


var user = {
			name: String,
			email: {type:String, unique:true},
			createdOn: {type: Date, required: true,default:Date.now},
			modifiedOn: Date,
			lastLogin: Date
			};

var userSchema = new mongoose.Schema(user);

	
var review = {
				//using population to relate schemas
				createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
				createdOn:{type: Date, required: true,default:Date.now},
				comments:{type: [String], required: true},
				rating: {type: Number, "default": 0}
			};

var reviewSchema = new mongoose.Schema(review);

var recipe = {
				title : {type: String, required: true,index: 'recipeName',unique:true},
				preparationTime:{type: Number, required: true},
				cookingTime:{type: Number, required: true},
				category:{type: String, required: true},
				ingredients:{type: [String], required: true},
				preparation:{type: String, required: true},
				rating: {type: Number, "default": 0},
				//using population to relate schemas
				createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
				createdOn:{type: Date, required: true, default:Date.now},
				modifiedOn:Date,
				//using nested schema or subdocument		
				reviews:[reviewSchema]
			};

var recipeSchema = new mongoose.Schema(recipe);

//Below mongoose compile the schema resulting in the mode, the model is a compiled version
//of the schema
//the model acts as a DAO to perform CRUD operations
mongoose.model('Recipe', recipeSchema,'recipes');
//by default the collection name is the lower case and pluralized of the Mode (User)
mongoose.model('User', userSchema);
//Review is a nested schema or subdocument to the parent Recipe schema. If a schema is only use by the parent, this
//needs to be a subdocument, that's the rule.
mongoose.model('Review', reviewSchema);





//inserting test data
var UserM = mongoose.model('User');


var newUser = new UserM({
			name: "Dan",
			email: "dan@myrecipe.com",			
		});

newUser.save(function(err,user){	
			if(!err){
				console.log("Saved user "+user.name);
			}else{
				console.log(err);
			}	
		});

 newUser = new UserM({
			name: "Yom",
			email: "yom@myrecipe.com",			
		});
newUser.save(function(err,user){	
			if(!err){
				console.log("Saved user "+user.name);
			}else{
				console.log(err);
			}	
		});


var RecipeM = mongoose.model('Recipe'); 



var recipeNew = new RecipeM({
				title : "Spelt bread",
				preparationTime:1,
				cookingTime:2,
				category:"Bread",
				ingredients:"Spelt flour",
				preparation:"First thing to go is mix the flour and eggs",
				createdBy : newUser.id
			});

recipeNew.save(function(err,recipe){	
			if(!err){
				console.log("Saved recipe "+recipe.title);
			}else{
				console.log(err);
			}	
		});

recipeNew = new RecipeM({
				title : "Rye bread",
				preparationTime:1,
				cookingTime:2,
				category:"Bread",
				ingredients:"Rye flour",
				preparation:"First thing to go is mix the flour and eggs",
				createdBy : newUser.id
			});

recipeNew.save(function(err,recipe){	
			if(!err){
				console.log("Saved recipe "+recipe.title);
			}else{
				console.log(err);
			}	
		});

recipeNew = new RecipeM({
				title : "Oat bread",
				preparationTime:1,
				cookingTime:2,
				category:"Bread",
				ingredients:"Oat flour",
				preparation:"First thing to go is mix the flour and eggs",
				createdBy : newUser.id
			});

recipeNew.save(function(err,recipe){	
			if(!err){
				console.log("Saved recipe "+recipe.title);
			}else{
				console.log(err);
			}	
		}); 


