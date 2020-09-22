const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (error) => {
    let errors = {
        username: '',
        email: '',
        password: ''
    };
    if(error.code === 11000 && error.keyPattern.username) {
        errors.username = 'Username already exists';
    }

    if(error.code === 11000 && error.keyPattern.email) {
        errors.email = 'Email id already exists';
    }

    if(error.message.includes('User validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if(error.message === 'Incorrect email') {
        errors.email = 'That email id is not registered';
    }

    if(error.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'subhodh secret', {
        expiresIn: maxAge
    });
};

//Login Controllers
module.exports.login_get = (req, res) => {
    res.render('login');
};
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

//Sign Up Controllers
module.exports.signup_get = (req, res) => {
    res.render('signup');
};
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: maxAge * 1000 });
        res.status(201).json({ user: user._id }); 
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

//Logout Controller
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};