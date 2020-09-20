const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true
    },
    username: {
        type: String
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'secret']
    },
    story: {
        type: String,
        required: [true, 'Please enter in your story']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Story', storySchema);