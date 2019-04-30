const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_commentsSchema = new Schema({
   user_id: {
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
   },
   comments_id: {
      type: String,
      trim: true,
      required: true,
   },
   comments_text: {
      type: String,
      trim: true,
      required: true,
   },
   status_id: {
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
module.exports = mongoose.model('user_comments', user_commentsSchema);
