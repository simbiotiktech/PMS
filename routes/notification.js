var express = require('express');
var Notification = require('../models/user_notifications.model.js');
const notificationController = require('../controller/notification');
const {
    check,
    validationResult
} = require('express-validator/check');
var router = express.Router();

// To fetch all the Notifications
router.get('/', function (req, res) {

    res.json({
        message: "All the notifications found..."
    });
})

//To fetch specific Notification based on the project
router.get('/:notification_id', [
    check('notification_id').isLength({
        min: 3
    }),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    Notification.find({
        notification_id: req.params.notification_id
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

//To Save New Notification
router.post('/create', [
    check('user_id').isLength({
        min: 3
    }),
    check('notification_id').isLength({
        min: 3
    }),
    check('project_id').isLength({
        min: 3
    }),
    check('milestone_id').isLength({
        min: 3
    }),
    check('status').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }


    const notification = new Notification({
        user_id: req.body.user_id,
        notification_id: req.body.notification_id,
        project_id: req.body.project_id,
        milestone_id: req.body.milestone_id,
        notification_text: req.body.notification_text,
        created: req.body.created,
        updated: req.body.updated,
        status: req.body.status
    });

    // Save Notifications in the database
    notification.save().then(data => {

        var response = {};

        if (data) {
            response.status = true;
            response.message = "Notification created Successfully..";
            response.data = data;

        } else {
            response.status = false;
            response.message = "Notification not created..";
        }
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Notification for Users."
        });
    });
});


// To change/modify Notifications
router.put('/:notification_id', function (req, res) {

    // Validate the Request

    if (req.body.user_id = '') {
        return res.status(400).send({
            message: "User id  can not be updated"
        });
    }

    if (req.body.project_id = '') {
        return res.status(400).send({
            message: "Project id can not be updated"
        });
    }

    if (req.body.milestone_id = '') {
        return res.status(400).send({
            message: "Milestone Id can not be Updated"
        });
    }
    if (req.body.notification_id = '') {
        return res.status(400).send({
            message: "Notification Id can't be Updated"
        });
    }
    if (req.body.notification_text = '') {
        return res.status(400).send({
            message: "Notification Text can't be Updated"
        });
    }
    if (req.body.status = '') {
        return res.status(400).send({
            message: "Notification Status can't be Updated"
        });
    }

    notification
        .update({
            user_id: req.body.user_id,
            milestone_id: req.body.milestone_id,
            project_id: req.body.project_id,
            notification_id: req.body.notification_id,
            notification_text: req.body.notification_text,
            status: req.body.status // field:values to update
        })
        .then((data) => {

            var response = {};


            if (data.ok = 1) {
                response.status = true;
                response.data = data;
                response.message = "Notification successfully Updated..";
            } else {
                response.status = false;
                response.message = "Notification Updation Fail";
            }
            res.send(response);

        }).catch((err) => {
            reject(err);
        })
});
// To delete Notification based on the Notification id
router.delete('/:notification_id', function (req, res) {

    var response = {};

    // Validate the Request

    if (req.body.notification_id = '') {
        return res.status(400).send({
            message: "Notification id  can not be deleted"
        });
    }

    notification.remove({
            notification_id: req.body.notification_id
        })
        .then(data => {
            console.log(data);
            if (data.ok = 1 && data.n > 0) {
                response.status = true;
                response.message = "Notification successfully deleted..";
            } else {
                response.status = false;
                response.message = "Notification Deletion Failed..";
            }

            res.send(response);

        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;