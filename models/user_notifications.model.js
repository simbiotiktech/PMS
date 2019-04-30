const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_notificationsSchema = new Schema({
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
   notification_id: {
      type: String,
      trim: true,
      required: true,
   },
   notification_text: {
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
      required: true
   }
});
module.exports = mongoose.model('user_notifications', user_notificationsSchema);
