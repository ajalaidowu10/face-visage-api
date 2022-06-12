const express = require('express');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
const db = knex({
  client: 'pg',
  connection: {
    host : process.env.PG_HOST,
    port : process.env.PG_PORT,
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    database : process.env.PG_DATABASE,
  }
});

app.get('/users', (req, res) => {
	db.select('*').from('users')
	  .then(data => {
		if(data.length){
			res.send({message:'Fetch Users Successfull', status:200, data:data});	
		}else{
			res.status(400).send({message:'Record not found', status:400, data:null});
		}
	})
	.catch(err => {
		res.status(400).send({message:'An error occured', status:400, data:null});
	});
});

app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	db.select('*').from('users')
	  .where({id}).then(data => {
		if(data.length){
			res.send({message:'Fetch User Successfull', status:200, data:data[0]});	
		}else{
			res.status(400).send({message:'Record not found', status:400, data:null});
		}
	})
	.catch(err => {
		res.status(400).send({message:'An error occured', status:400, data:null});
	});
});

app.post('/signin', (req, res) => {
	const {email, password} = req.body;
	db.select('email', 'hash').from('logins')
	  .where({email}).then(data => {
	  	const isValid = bcrypt.compareSync(password, data[0].hash);
		if(data.length && isValid){
			db.select('*').from('users')
			  .where({email}).then(user => {
			  	res.send({message:'Signin Successfull', status:200, data:user[0]});	
			  });
		}else{
			res.status(400).send({message:'Wrong Email or Password', status:400, data:null});
		}
	})
	.catch(err => {
		res.status(400).send({message:'An error occured', status:400, data:null});
	});
});

app.post('/users', (req, res) => {
	const {username, email, password} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trn => {
		trn.insert({ hash, email })
			.into('logins')
			.returning('email')
			.then(userEmail => {
				trn('users')
				.returning('*')
				.insert({
					username:username, 
					email:userEmail[0]['email'], 
					created_at:new Date()
				})
				.then(data => {
					res.send({message:'Signup Successfull', status:200, data:data[0] });
				})
		})
		.then(trn.commit)
		.catch(trn.rollback)

	})
	.catch(err => {
		res.status(400).send({message:'An error occured', status:400, data:null});
	});
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users').where({id})
	.increment('entries', 1)
	.returning('entries')
	.then(data => {
		res.json({message:'Upload Successfull', status:200, data:data[0] });
	})
	.catch(err => {
		res.status(400).send({message:'An error occured', status:400, data:null});
	});
});

app.listen(process.env.PORT);
