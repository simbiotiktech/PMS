const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_tasklistsSchema = new Schema({
    tasklist_id: {
        type: String,
        trim: true,
        required: true,
    },
    project_id: {
        type: String,
        trim: true,
        required: true,
    },
    milestone_id: {
        type: String,
        trim: true,
        required: true,
        ref: 'milestone',
    },
    tasklist_name: {
        type: String,
        trim: true,
        required: true,
    },
    desc: {
        type: String,
        trim: true,
        required: true,
    },
    created: {
        type: String,
        trim: true,
        required: true,
    },
    updated: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: false,
    }
});
module.exports = mongoose.model('user_tasklists', user_tasklistsSchema);
