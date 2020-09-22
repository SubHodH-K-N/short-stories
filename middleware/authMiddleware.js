const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    ensureAuth: (req, res, next) => {
        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'subhodh secret', (err, decodedToken) => {
                if(err) {
                    res.redirect('/login');
                } else {
                    next();
                }
            });
        } else {
            res.redirect('/login');
        }
    },
    checkUser: (req, res, next) => {
        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, 'subhodh secret', async (err, decodedToken) => {
                if(err) {
                    res.locals.user = null;
                    next();
                } else {
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    }
};