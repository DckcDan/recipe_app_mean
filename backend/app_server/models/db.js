var mongoose = require('mongoose');
//import our schema, but we dont need to assign it to a variable
require('./schema')
var dbURI = 'mongodb://localhost:27017/myRecipe';
var gracefulShutdown;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {               
  console.log('Mongoose connected to ' + dbURI);                
});                                                             
mongoose.connection.on('error',function (err) {                 
  console.log('Mongoose connection error: ' + err);             
});                                                             
mongoose.connection.on('disconnected', function () {            
  console.log('Mongoose disconnected');                         
});                                                             
gracefulShutdown = function (msg, callback) {                   
  mongoose.connection.close(function () {                       
    console.log('Mongoose disconnected through ' + msg);        
    callback();                                                 
  });                                                           
};                                                              
// For nodemon restarts                                         
process.once('SIGUSR2', function () {                           
  gracefulShutdown('nodemon restart', function () {             
    process.kill(process.pid, 'SIGUSR2');                       
  });                                                           
});                                                             
// For app termination                                          
process.on('SIGINT', function() {                               
  gracefulShutdown('app termination', function () {             
    process.exit(0);                                            
  });                                                           
});                                                             
// For Heroku app termination                                   
process.on('SIGTERM', function() {                              
  gracefulShutdown('Heroku app shutdown', function () {         
    process.exit(0);                                            
  });                                                           
}); 