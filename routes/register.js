const router = require('express').Router()
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const SALT = process.env.SALT || 16
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:5000/iauth'

router.post('/', async(req, res)=>{

	try{
		const crypt_pass = bcrypt.hashSync(req.body.password, SALT)

		var new_user = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: crypt_pass,
			mobile: req.body.mobile,
			dob: req.body.dob,
			date: Date()
		}

	
		await MongoClient.connect(MONGO_URI, async (err, client)=>{

			if(err){
				res.status(501).json({success: false})
			}

			const user_db = client.db('iauth').collection('user')

			await user_db.insertOne(new_user, (err, user)=>{
				if(err){
					res.status(501).json({success: false})
				}
				res.status(200).json({user: user.ops[0], success: true})
			})
		})
	}
	catch{
		res.status(501)
	}
})

module.exports = router;