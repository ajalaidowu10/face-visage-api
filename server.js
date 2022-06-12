const express = require('express');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'idowu',
    password : 'idajax',
    database : 'facevisage'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});


app.get('/users', (req, res) => {
	res.send(db.users);
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
		res.status(400).send({message:'An errro occured', status:400, data:null});
	});
});

app.post('/signin', (req, res) => {
	const {email, password} = req.body;
	const user = db.users.filter((item) => {
					return (item.email === email && item.password === password);
				});
	if(user.length){
		res.send({message:'Login Successfull', status:200, data:user[0] });
	}else{
		res.status(400).send({message:'Wrong Email or Password', status:400, data:null });
	}
});

app.post('/signup', (req, res) => {
	const {name, email, password} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trn => {
		trn.insert({ hash, email })
			.into('logins')
			.returning('email')
			.then(userEmail => {
				trn('users')
				.returning('*')
				.insert({
					name:name, 
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
		console.log(err);
		res.status(400).send({message:'An errro occured', status:400, data:null});
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
		res.status(400).send({message:'An errro occured', status:400, data:null});
	});
});


app.listen(3002);