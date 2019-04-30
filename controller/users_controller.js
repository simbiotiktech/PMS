const users = require('../models/users.model.js'); // Import the model and store it in a variable

// Create and Register New User
exports.create = (req, res) => {

    // Validate Request

    if (!req.body.user_id) {
        return res.status(400).send({
            message: "User id  can not be blank"
        });
    }

    if (!req.body.user_fname) {
        return res.status(400).send({
            message: "User First Name can not be empty"
        });
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "User EmailId can not be empty"
        });
    }
    if (!req.body.contact) {
        return res.status(400).send({
            message: "User Contact must be given"
        });
    }




};

// Register a new User
const users = new users({
    user_id: req.body.user_id || "Unnamed User",
    user_fname: req.body.user_fname || "Undefined First Name",
    user_lname: req.body.user_lname || "Undefined Last Name",
    email: req.body.email || "Invalid Email",
    contact: req.body.contact || "Invalid Contact",
    gender: req.body.gender || "Invalid Gender",
    zip: req.body.zip || "Invalid Zip",
    address: req.body.address || "Invalid address",
    state: req.body.state || "invalid State",
    country: req.body.country || "Invalid Country",
    profile_pic: req.body.profile_pic || "Invalid Image",
    company: req.body.company || "Invalid Company",
    password: req.body.password || "Invalid Password",
    created: req.body.created || "Invalid Creation",
    updated: req.body.updated || "Invalid Updation"
});

// Save User in the database
users.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Users."
        });
    });

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {

    users.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with a UserId
exports.findOne = (req, res) => {

    users.findById(req.body.user_id)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.body.user_id
            });
        });
};

// Update a user identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find Users and update it with the request body
    Note.findByIdAndUpdate(req.params.user_id, {
            user_id: req.body.user_id || "Untitled User",
            user_fname: req.body.user_fname || "Undefined First Name",
            email: req.body.email || "Undefined Email",
            contact: req.body.contact || "Invalid Contact"
        }, {
            new: true
        })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            return res.status(500).send({
                message: "Error updating User with id " + req.body.user_id
            });
        });

};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {

    users.findByIdAndRemove(req.params.user_id)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.send({
                message: "Users deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            return res.status(500).send({

                message: "Could not delete user with id " + req.body.user_id
            });
        });
};