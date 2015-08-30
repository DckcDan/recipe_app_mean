# recipe_app_mean
Application to manage food recipes using the MEAN stack

Frameworks used:
Mongodb, Nodejs, Expressjs, Angularjs
,Bootstrap UI framework


Express.js MVC architecture:

Separation of concerns

	Application - Routers - Controllers
	app.js -> index.js -> main.js


We are using the same node server to run the backend and frontend. Nodemon service to run nodejs applications.


Good practices:

- The use of the controllerAs
- The use of promises


Run application:
 
 1 - Start up the mongo server by running mongod
 2 - Run the node js server by running nodemon app.js from the backend folder