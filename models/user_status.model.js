const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_statusSchema = new Schema({
   status_id: {
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
   status_text: {
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
module.exports = mongoose.model('user_status', user_statusSchema);
