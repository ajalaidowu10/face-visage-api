const express = require('express');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const userController = require('./controllers/userController');
const facevisageController = require('./controllers/facevisageController');
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
  	connectionString: process.env.PG_CONNECTION_STRING,
  	ssl: { rejectUnauthorized: false }
  }
});
app.get('/users', (req, res) => { userController.index(req, res, db) });
app.get('/users/:id', (req, res) => { userController.show(req, res, db) });
app.post('/signin', (req, res) => { userController.signin(req, res, db, bcrypt) });
app.post('/users', (req, res) => { userController.store(req, res, db, bcrypt) });
app.put('/users/entries', (req, res) => { userController.updateEntries(req, res, db) });
app.post('/facevisage/image', (req, res) => { facevisageController.handle(req, res) });

app.listen(process.env.PORT);
