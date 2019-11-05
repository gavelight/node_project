require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');

// Initializing express app
const app = express();

// Establishing connection to our mongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// Getting db refrence object
const db = mongoose.connection;

// Handling error
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Enable cors 
var cors = require('cors');
app.use(cors());

// Parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.json());

// Linking our routing module to be used as a middleware for the "users" mount path (HTTP request)
app.use('/users', usersRouter);

// Starting the server
app.listen(3001, () => console.log('Server started'));