const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const projectsSchema = new Schema({
   project_id: {
      type: String,
      trim: true,
      required: true,
      unique: true
   },
   project_name: {
      type: String,
      trim: true,
      required: true,
   },
   project_desc: {
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
      required: true
   }
});
module.exports = mongoose.model('projects', projectsSchema);
