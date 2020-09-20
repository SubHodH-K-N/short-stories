const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { ensureAuth, checkUser } = require('./middleware/authMiddleware');

//Initialising config files
dotenv.config({ path: './config/config.env' });

//Connecting to the database
connectDB();

//Initialising an express app
const app = express();

//Initialising static file
app.use(express.static('public'));

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//Setting up ejs
app.set('view engine', 'ejs');

//Setting up morgan
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.use('*', checkUser);
app.use('/', require('./routes/index'));
app.use(require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));