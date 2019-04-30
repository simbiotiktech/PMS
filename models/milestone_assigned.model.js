const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const milestone_assignedSchema = new Schema({
  milestone_ass_id: {
    type: String,
    trim: true,
    required: true,
  },
  user_id: {
    type: String,
    trim: true,
    required: true,
    ref: 'users',
  },
  milestone_id: {
    type: String,
    trim: true,
    required: true,
    ref: 'milestone',
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
module.exports = mongoose.model('milestone_assigned', milestone_assignedSchema);
