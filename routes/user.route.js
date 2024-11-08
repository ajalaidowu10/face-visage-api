const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
  	connectionString: process.env.PG_CONNECTION_STRING,
  	// ssl: { rejectUnauthorized: false }
  }
});

const userRouter = express.Router();	
const userController = require('../controllers/user.controller');

userRouter.get('/', (req, res) => { userController.index(req, res, db) });
userRouter.post('/signin', (req, res) => { userController.signin(req, res, db, bcrypt) });
userRouter.get('/:id', (req, res) => { userController.show(req, res, db) });
userRouter.post('/', (req, res) => { userController.store(req, res, db, bcrypt) });
userRouter.put('/entries', (req, res) => { userController.updateEntries(req, res, db) });

module.exports = userRouter;