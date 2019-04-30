var express = require('express');
var Users = require('../models/users.model.js');
const userController = require('../controller/users');
const {
   check,
   validationResult
} = require('express-validator/check');
var router = express.Router();
//router.post('/registration', userController.create);
router.post('/login', userController.login);


//To fetch all the Users Information
router.get('/users', function (req, res) {

   var user = {};
   // Validate the Request
   if (req.body.user_id = '') {
      return res.status(400).send({
         message: "User id  can not be blank"
      });
   }

   if (req.body.user_fname = '') {
      return res.status(400).send({
         message: "User First Name can not be empty"
      });
   }

   if (req.body.email = '') {
      return res.status(400).send({
         message: "User email can not be empty"
      });
   }
   if (req.body.contact = '') {
      return res.status(400).send({
         message: "User Contact must be given"
      });
   }


   users.find({})
      .then(data => {
         var response = {};
         if (data.length > 0) {
            response.status = true;
            response.data = data;
         } else {
            response.status = false;
            response.data = data;
         }
         res.send(response);
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
         });
      });
   res.json(users);
});


//To fetch specific user
router.get('/:user_id', [
   check('user_id').isLength({
      min: 3
   }),
], (req, res) => {

   const errors = validationResult(req);
   console.log(req.body);
   if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
   }

   Users.find({
      user_id: req.params.user_id
   }).then((data) => {
      var response = {};


      if (data.length > 0) {

         response.status = true;
         response.message = "success";
         response.data = data;

      } else {
         response.status = false;
         response.message = "fail";
      }
      res.send(response);
   }).catch((err) => {
      res.send(err);
   });

});

//To Register New Users
router.post('/registration', [
   check('user_fname', 'user First Name must be provided').contains(),
   check('user_id').isLength({
      min: 3
   }),
   check('email').isEmail(),
   check('contact').isInt(),
   check('company').contains(),
], (req, res) => {

   const errors = validationResult(req);
   console.log(req.body);
   if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
   }
   const users = new Users({
      user_id: req.body.user_id,
      user_fname: req.body.user_fname,
      user_lname: req.body.user_lname,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
      company: req.body.company,
      zip: req.body.zip,
      country: req.body.country,
      state: req.body.state,
      gender: req.body.gender,
      address: req.body.address,
      profile_pic: req.body.profile_pic,
      created: req.body.created,
      updated: req.body.updated
   });

   // Save Users in the database
   users.save().then(data => {

      var response = {};

      if (data) {
         response.status = true;
         response.message = "Registration done Successfully..";
         response.data = data;

      } else {
         response.status = false;
         response.message = "Registration failed..";
      }
      res.send(response);
   }).catch(err => {
      res.status(500).send({
         message: err.message || "Some error occurred while creating the Users."
      });
   });
});


// To change/modify users
router.put('/:user_id', [

   check('user_fname', 'User First Name must be provided').contains(),
   check('email').isEmail(),
   check('contact').isInt(),
], (req, res) => {

   const errors = validationResult(req);
   console.log(req.body);
   if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
   }


   Users
      .update({
         user_id: req.body.user_id,
         user_fname: req.body.user_fname,
         email: req.body.email,
         contact: req.body.contact // field:values to update
      })
      .then((data) => {

         var response = {};


         if (data.ok = 1) {
            response.status = true;
            response.data = data;
            response.message = "successfully Updated..";
         } else {
            response.status = false;
            response.message = "Updation Fail";
         }
         res.send(response);

      }).catch((err) => {
         reject(err);
      })
});
// To delete users based on the user id
router.delete('/:user_id', [

   check('user_id', 'Id should be valid').isEmpty()

], (req, res) => {
   var response = {};

   Users.remove({
         user_id: req.params.user_id
      })
      .then(data => {
         console.log(data);
         if (data.ok = 1 && data.n > 0) {
            response.status = true;
            response.message = "successfully deleted..";
         } else {
            response.status = false;
            response.message = "Deletion Failed..";
         }

         res.send(response);

      })
      .catch(err => {
         console.error(err)
      })
});

// To aunthenticate(Login) Users
router.get('/login', function (req, res) {


   // Validate the Request

   if (!req.body.user_id) {
      return res.status(400).send({
         message: "User id  can not be deleted"
      });
   }

   if (!req.body.password) {
      return res.status(400).send({
         message: "Password  can not be deleted"
      });
   }




   Users.find({
      user_id: req.body.user_id,
      password: req.body.password
   }, function (err, docs) {
      console.log('err', err);
      console.log('docs', docs);


      if (docs) {
         res.send({
            status: "success",
            message: "Login Successfully",
            docs
         });
      }


   });


});


module.exports = router;