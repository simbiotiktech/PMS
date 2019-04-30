const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

const usersSchema = new Schema({
        user_id: {
                type: String,
                trim: true,
                required: true,
                unique: true
        },
        user_fname: {
                type: String,
                trim: true,
                required: true,
        },
        user_lname: {
                type: String,
                trim: true,
                required: true,
        },
        email: {
                type: String,
                trim: true,
                required: true,
        },
        contact: {
                type: String,
                trim: true,
                required: true,
        },
        password: {
                type: String,
                trim: true,
                required: true,
        },
        company: {
                type: String,
                trim: true,
                required: false,
        },
        zip: {
                type: String,
                trim: true,
                required: false,
        },
        gender: {
                type: String,
                trim: true,
                required: false,
        },
        address: {
                type: String,
                trim: true,
                required: false,
        },
        state: {
                type: String,
                trim: true,
                required: false,
        },
        country: {
                type: String,
                trim: true,
                required: false,
        },
        profile_pic: {
                type: String,
                trim: true,
                required: false,
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

        roles: [{
                        user_id: '',
                        roles_id: '',
                        roles_name: '',
                        created: '',
                        updated: ''
                }


        ]
});

// hash user password before saving into database
usersSchema.pre('save', function (next) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
        next();
});

module.exports = mongoose.model('users', usersSchema);
