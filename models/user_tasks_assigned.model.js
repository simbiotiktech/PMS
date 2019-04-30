const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const user_tasks_assignedSchema = new Schema({
   task_ass_id: {
      type: String,
      trim: true,
      required: true,
   },
   user_id: {
      type: String,
      trim: true,
      required: true,
   },
   task_id: {
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
module.exports = mongoose.model('user_tasks_assigned', user_tasks_assignedSchema);
