const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/user.route');
const facevisageRouter = require('./routes/facevisage.route');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


app.use('/users', userRouter);
app.use('/facevisage', facevisageRouter);


app.listen(process.env.PORT);
