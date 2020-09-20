const Story = require('../models/Story');

const handleErrors = (error) => {
    let errors = {
        title: '',
        story: ''
    };

    if(error.message.includes('Story validation failed')) {
        Object.values(error.errors).forEach(({ properties }) =>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports.stories_get = async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' });
        if(stories.length != 0) {
            res.locals.publicStories = stories;
        } else {
            res.locals.publicStories = null;
        }
        res.render('stories');  
    } catch (error) {
        console.log(error);
    }
};

module.exports.addStories_get = (req, res) => {
    res.render('addStories');
};

module.exports.addStories_post = async (req, res) => {
    req.body.user = res.locals.user._id;
    req.body.username = res.locals.user.username;
    const { title, username, status, story, user } = req.body;
    try {
        const stories = await Story.create({ title, username, status, story, user });
        res.status(201).json({ story: stories._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

module.exports.editStories_get = async (req, res) => {
    const id = req.params.id;
    try {
        const story = await Story.findOne({ 
            _id: id 
        });
        if(story.user.equals(res.locals.user._id)) {
            res.locals.story = story;
            res.render('editStories');
        } else {
            res.locals.story = null;
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports.editStories_put = async (req, res) => {
    const id = req.params.id;
    try {
        let story = await Story.findById(id);
        story = await Story.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ story: story._id });
    } catch (error) {
        const errors = handleErrors(errors);
        res.status(400).json({ errors });
    }
};

module.exports.stories_delete = async (req, res) => {
    const id = req.params.id;
    try {
        let story = await Story.findById(id);
        await Story.deleteOne({ _id: id });
        res.status(200).json({ story: story._id });
    } catch (error) {
        res.status(400).json({ error: 'error' });
    } 
};

module.exports.story_get = async (req, res) => {
    const id = req.params.id;
    try {
        const story = await Story.findById(id);
        res.locals.story = story;
        res.render('story');
    } catch (error) {
        console.log(error);
    }

};