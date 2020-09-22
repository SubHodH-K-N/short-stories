const { Router } = require('express');
const { ensureAuth } = require('../middleware/authMiddleware');
const storyControllers = require('../controllers/storyControllers');
const router = Router();

//POST from addStories
router.post('/', ensureAuth,  storyControllers.addStories_post);

//GET public stories
router.get('/', ensureAuth, storyControllers.stories_get);

//GET addStories page
router.get('/addStories', ensureAuth, storyControllers.addStories_get);

//GET editStories page
router.get('/editStories/:id', ensureAuth, storyControllers.editStories_get);

//PUT from editStories page
router.put('/:id', ensureAuth, storyControllers.editStories_put);

//DELETE stories
router.delete('/:id', ensureAuth, storyControllers.stories_delete);

//GET individual story
router.get('/story/:id', ensureAuth, storyControllers.story_get);
module.exports = router;