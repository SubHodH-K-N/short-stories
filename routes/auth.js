const { Router } = require('express');
const router = Router();
const authControllers = require('../controllers/authControllers');
const { checkUser } = require('../middleware/authMiddleware');

//Login routes
router.get('/login', checkUser, authControllers.login_get);
router.post('/login', authControllers.login_post);

//Sign Up routes
router.get('/signup', checkUser, authControllers.signup_get);
router.post('/signup', authControllers.signup_post);

//Logout route
router.get('/logout', authControllers.logout_get);

module.exports = router;