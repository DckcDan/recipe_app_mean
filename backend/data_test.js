
//user

db.users.save({
			name: "Daniel",
			email: "dan@myrecipe.com",			
		}
);

db.users.save({
			name: "Tom",
			email: "tom@myrecipe.com",			
		}
);

//recipes

var recipe = {
				title : {type: String, required: true,index: 'recipeName'},
				preparationTime:{type: Number, required: true},
				cookingTime:{type: Number, required: true},
				category:{type: Number, required: true},
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
			
db.recipes.save({
			name: "Tom",
			email: "tom@myrecipe.com",			
		}
);