const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_filesSchema = new Schema({
   file_id: {
      type: String,
      trim: true,
      required: true,
   },
   project_id: {
      type: String,
      trim: true,
      required: true,
   },
   user_id: {
      type: String,
      trim: true,
      required: true,
   },
   milestone_id: {
      type: String,
      trim: true,
      required: true,
   },
   project_folder_id: {
      type: String,
      trim: true,
      required: true,
   },
   file_name: {
      type: String,
      trim: true,
      required: true,
   },
   file_desc: {
      type: String,
      trim: true,
      required: true,
   },
   tags: {
      type: String,
      trim: true,
      required: true,
   },
   file_added_time: {
      type: String,
      trim: true,
      required: true,
   },
   file_details: {
      type: String,
      trim: true,
      required: true,
   },
   file_type: {
      type: String,
      trim: true,
      required: true,
   },
   file_title: {
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
});
module.exports = mongoose.model('user_files', user_filesSchema);
