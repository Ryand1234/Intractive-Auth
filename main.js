const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const axios = require('axios')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:5000/iauth'
const question = [
	"Enter Your Email Id",
	"Enter Your Username",
	"Enter Your Name",
	"Enter Your Password",
	"Enter Your Mobile Number",
	"Enter Your DOB"
]

//App Setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(MONGO_URI, (err, client)=>{
	if(err){
		console.log("Cannot Connect to Databse")
	}
	else{

		//Server Listning
		const server = app.listen(3000 || PORT, ()=>{
			console.log(`Server listing at port ${PORT || 3000}`)
		})

		const io = require('socket.io')(server)
		io.on('connection', (socket)=>{

			socket.on('init', ()=>{
				socket.index = 0;
			})

			socket.on('id',(data)=>{
				socket.email = data.email;
				socket.index += 1;
				socket.emit("auth", question[socket.index])
			})
			socket.on('username',(data)=>{
				socket.username = data.username;
				socket.index += 1;
				socket.emit("auth", question[socket.index])
			})
			socket.on('name',(data)=>{
				socket.name = data.name;
				socket.index += 1;
				socket.emit("auth", question[socket.index])
			})
			socket.on('number',(data)=>{
				socket.number = data.number;
				socket.index += 1;
				socket.emit("auth", question[socket.index])
			})
			socket.on('passwd',(data)=>{
				socket.password = data.password;
				socket.index += 1;
				socket.emit("auth", question[socket.index])
			})
			socket.on('dob',async(data)=>{
				socket.dob = data.dob;
				axios(options)
				  .then((res)=>{
					socket.emit("auth", "Thank you for Registering!!\nVisit /login to login to the Platform.")		
				  })
				  .catch((err)=>{
				  	socket.emit("auth", "Error Occured During Registering!!!!!!\nPlease try again later")
				  })
			})
		})	
	}
})


//Routes file import
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')

//Declare routes
app.use('/register', registerRoute)
app.use('/login', loginRoute)


//Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Message: ",err.message);
  console.log("ERROR: ",res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


