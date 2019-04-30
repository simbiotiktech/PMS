const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_projectsSchema = new Schema({
    project_id: {
        type: String,
        trim: true,
        required: true,
        ref: 'users',
    },
    project_name: {
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
        required: true,
    },
    budget: {
        type: String,
        trim: true,
        required: true,
    }
});
module.exports = mongoose.model('user_projects', user_projectsSchema);
