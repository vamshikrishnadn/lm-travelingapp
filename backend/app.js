const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// Import all routes
const auth = require('./routes/auth.routes');
const travel = require('./routes/travel.routes');
const errorMiddleware = require('./middlewares/errors');
dotenv.config({});

// Image upload
app.use(express.static('uploads'));

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(cors());
// app.use(fileUpload());

// routes
app.use('/v1/auth', auth);
app.use('/v1/travel', travel);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
