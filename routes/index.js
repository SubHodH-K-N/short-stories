const { Router } = require('express');
const { checkUser, ensureAuth } = require('../middleware/authMiddleware');
const router = Router();
const Story = require('../models/Story');

router.get('/', checkUser, (req, res) => {
    res.render('login');
});

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const user = res.locals.user;
        const stories = await Story.find({ user: user._id });
        if(stories.length != 0) {
            res.locals.myStories = stories;
        } else {
            res.locals.myStories = null;
        }
        res.render('dashboard');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;