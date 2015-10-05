# recipe_app_mean
Application to manage food recipes using the MEAN stack

Frameworks used:

    Mongodb, Nodejs, Expressjs, Angularjs
    ,Bootstrap UI framework

    Nodemon for the node.js application
    Grunt for the angularjs web application.

    JWT - Json web token
    Passport - Authetication midleware for node.js
        npm install --save passport
        npm install --save passport-local

Separation of concerns

	Application - Routers - Controllers
	app.js -> index.js -> main.js
    App organize by feature then by type

We are using the same node server to run the backend and frontend. Nodemon service to run nodejs applications.


Good practices:

    - The use of the controllerAs
    - The use of promises


Security:

    JWT (Json Web Token), passport, passport-jwt.

    The SPA adds to token using an interceptor to the header and this is how it looks in the HTTP request

    authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY0MTNkZDJmZWRlOGJiMmQ0MjdlM2IiLCJlbWFpbCI6ImRhbmllbC5scGFAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJEYW5pZWwgQW0iLCJleHAiOjE0NDQ2NzgxNTksImlhdCI6MTQ0NDA3MzM1OX0.NTqffbmc_a2WNybuZprNgU1gqzzyfSlX0J4IZbxbD0g



Run application:
 
     1 - Start up the mongo server by running mongod
     2 - Run the node js server by running nodemon app.js from the backend folder




 Plugins:
 Chrome plugin AngularJS Batarang :Extends the Developer Tools, adding tools for debugging and profiling AngularJS applications.
 
 
 Backend -> nodemon
 Frontend -> grunt