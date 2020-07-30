const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const server = express()
const PORT = process.env.PORT


//App Setup
server.use(bodyParser.urlencoded({extended: true}));
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));


//Routes file import
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')

//Declare routes
server.use('/register', registerRoute)
server.use('/login', loginRoute)


//Error Handler
server.use(function(req, res, next) {
  next(createError(404));
});

server.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Message: ",err.message);
  console.log("ERROR: ",res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Server Listning
server.listen(()=>{
	console.log(`Server listing at port ${PORT || 3000}`)
})