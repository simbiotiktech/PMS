const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const rolesSchema = new Schema({

   user_id: { // Ref. from Users Collection
      type: String,
      trim: true,
      required: true,
      ref: 'users',
   },
   roles_id: { // Ref. from user_roles Collection
      type: String,
      trim: true,
      required: true,
      ref: 'user_roles',
   },
   roles_name: {
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
module.exports = mongoose.model('roles', rolesSchema);
