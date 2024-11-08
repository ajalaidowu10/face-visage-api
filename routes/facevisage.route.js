const express = require('express');
const facevisageRouter = express.Router();
const facevisageController = require('../controllers/facevisage.controller');

facevisageRouter.post('/image', (req, res) => { facevisageController.handle(req, res) });

module.exports = facevisageRouter;