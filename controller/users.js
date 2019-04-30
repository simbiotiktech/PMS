const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
   getById: function (req, res, next) {
      console.log(req.body);
      userModel.findById(req.body.user_id, function (err, userInfo) {
         if (err) {
            next(err);
         } else {
            res.json({
               status: "success",
               message: "User found!!!",
               data: {
                  users: userInfo
               }
            });
         }
      });
   },
   getAll: function (req, res, next) {
      let usersList = [];
      userModel.find({}, function (err, users) {
         if (err) {
            next(err);
         } else {
            for (let user of users) {
               usersList.push({
                  user_id: users.user_id,
                  user_fname: users.user_fname,
                  user_lname: users.user_lname
               });
            }
            res.json({
               status: "success",
               message: "Users list found!!!",
               data: {
                  users: usersList
               }
            });

         }
      });
   },
   updateById: function (req, res, next) {
      userModel.findByIdAndUpdate(req.body.user_id, {
         fname: req.body.user_fname
      }, function (err, userInfo) {
         if (err)
            next(err);
         else {
            res.json({
               status: "success",
               message: "User updated successfully!!!",
               data: null
            });
         }
      });
   },
   deleteById: function (req, res, next) {
      userModel.findByIdAndRemove(req.body.user_id, function (err, userInfo) {
         if (err)
            next(err);
         else {
            res.json({
               status: "success",
               message: "User deleted successfully!!!",
               data: null
            });
         }
      });
   },
   create: function (req, res, next) {
      userModel.create({
         user_fname: req.body.user_fname,
         email: req.body.email,
         password: req.body.password
      }, function (err, result) {
         if (err)
            next(err);
         else
            res.json({
               status: "success",
               message: "User added successfully!!!",
               data: null
            });

      });
   },
   login: function (req, res, next) {
      userModel.findOne({
         email: req.body.email
      }, {
         password: req.body.password
      }, function (err, userInfo) {
         if (err) {
            next(err);
         } else {
            //console.log(req.body.password);
            // console.log( userInfo.password);
            console.log(req.body);

            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
               const token = jwt.sign({
                  id: userInfo._id
               }, req.app.get('secretKey'), {
                  expiresIn: '1h'
               });
               res.json({
                  status: "success",
                  message: "user found!!!",
                  data: {
                     user: userInfo,
                     token: token
                  }
               });


            } else {

               res.json({
                  status: "error",
                  message: "Invalid email/password!!!",
                  data: null
               });

            }
         }
      });
   },

   authenticate: function (req, res, next) {
      userModel.findOne({
         email: req.body.email
      }, function (err, userInfo) {
         if (err) {
            next(err);
         } else {
            if (bcrypt.compareSync(req.body.password, users.password)) {
               const token = jwt.sign({
                  id: userInfo._id
               }, req.app.get('secretKey'), {
                  expiresIn: '1h'
               });
               res.json({
                  status: "success",
                  message: "user found!!!",
                  data: {
                     user: userInfo,
                     token: token
                  }
               });
            } else {
               res.json({
                  status: "error",
                  message: "Invalid email/password!!!",
                  data: null
               });
            }
         }
      });
   },
}