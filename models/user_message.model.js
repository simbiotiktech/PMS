const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_messageSchema = new Schema({
   msg_id: {
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
   msg_title: {
      type: String,
      trim: true,
      required: true,
   },
   msg_text: {
      type: String,
      trim: true,
      required: true,
   },
   posted: {
      type: String,
      trim: true,
      required: true
   },
   updated: {
      type: String,
      trim: true,
      required: true
   },
   user_name: {
      type: String,
      trim: true,
      required: true
   },
   reply_to: {
      type: String,
      trim: true,
      required: true
   }
});
module.exports = mongoose.model('user_message', user_messageSchema);
