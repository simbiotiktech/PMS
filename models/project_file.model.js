const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const project_fileSchema = new Schema({
  project_file_id: {
    type: String,
    trim: true,
    required: true,
  },
  project_id: {
    type: String,
    trim: true,
    required: true,
  },
  parent: {
    type: String,
    trim: true,
    required: true,
  },
  project_file_name: {
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
  proj_file_desc: {
    type: String,
    trim: true,
    required: true,
  }
});
module.exports = mongoose.model('project_file', project_fileSchema);
