const NotificationModel = require('../models/user_notifications.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        NotificationModel.findById(req.body.notification_id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Notification found!!!",
                    data: {
                        user_notifications: userInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let notificationList = [];
        NotificationModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let notification of users) {
                    notificationList.push({
                        notification_id: user_notifications.notification_id,
                        project_id: user_notifications.project_id,
                        milestone_id: user_notifications.milestone_id,
                        status: user_notifications.status
                    });
                }
                res.json({
                    status: "success",
                    message: "Notification list found!!!",
                    data: {
                        user_notifications: usersList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        NotificationModel.findByIdAndUpdate(req.body.notification_id, {
            project_id: req.body.project_id
        }, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Notification updated successfully!!!",
                    data: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        NotificationModel.findByIdAndRemove(req.body.notification_id, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Notification deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        NotificationModel.create({
            user_id: req.body.user_id,
            project_id: req.body.project_id,
            milestone_id: req.body.milestone_id,
            notification_id: req.body.notification_id,
            notification_text: req.body.notification_text,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Notification added successfully!!!",
                    data: null
                });

        });
    },

}