const tasklistModel = require('../models/user_tasklists.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        tasklistModel.findById(req.body.tasklist_id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Tasklists found!!!",
                    data: {
                        user_tasklists: userInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let tasklistList = [];
        tasklistModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let tasklist of users) {
                    usersList.push({
                        tasklist_id: user_tasklists.tasklist_id,
                        project_id: user_tasklists.project_id,
                        milestone_id: user_tasklists.milestone_id,
                        tasklist_name: user_tasklists.tasklist_name
                    });
                }
                res.json({
                    status: "success",
                    message: "Tasklists list found!!!",
                    data: {
                        tasklist: usersList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        tasklistModel.findByIdAndUpdate(req.body.tasklist_id, {
            project_id: req.body.project_id
        }, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Tasklists updated successfully!!!",
                    data: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        tasklistModel.findByIdAndRemove(req.body.tasklist_id, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Tasklists deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        tasklistModel.create({
            tasklist_id: req.body.tasklist_id,
            project_id: req.body.project_id,
            milestone_id: req.body.milestone_id,
            tasklist_name: req.body.tasklist_name,
            desc: req.body.desc,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status

        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Tasklists added successfully!!!",
                    data: null
                });

        });
    },
}