const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_tasksSchema = new Schema({
    task_id: {
        type: String,
        trim: true,
        required: true,
    },
    project_id: {
        type: String,
        trim: true,
        required: true,
    },
    task_title: {
        type: String,
        trim: true,
        required: true,
    },
    task_desc: {
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
        required: true,
    }
});
module.exports = mongoose.model('user_tasks', user_tasksSchema);
