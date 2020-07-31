const router = require('express').Router()
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const SALT = process.env.SALT || 16
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:5000/iauth'

router.post('/', async(req, res)=>{


	await MongoClient.connect(MONGO_URI, async (err, client)=>{

		if(err){
			res.status(501).json({success: false})
		}

		const user_db = client.db('iauth').collection('user')

		await user_db.findOne({ email: req.body.email}, (err, user)=>{
			if(err){
				res.status(501).json({success: false})
			}
			if(bcrypt.compare(user.password, req.body.password)){
				res.status(200).json({user: user, success: true})	
			} else {
				res.status(501).json({success: false})
			}
			
		})
	})
})

module.exports = router;