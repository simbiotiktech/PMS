const taskModel = require('../models/user_tasks.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        taskModel.findById(req.body.task_id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Tasks found!!!",
                    data: {
                        user_tasks: userInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let taskList = [];
        taskModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let task of users) {
                    usersList.push({
                        task_id: user_tasks.task_id,
                        project_id: user_tasks.project_id,
                        task_title: user_tasks.task_title
                    });
                }
                res.json({
                    status: "success",
                    message: "Tasks list found!!!",
                    data: {
                        task: usersList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        taskModel.findByIdAndUpdate(req.body.task_id, {
            project_id: req.body.project_id
        }, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "tasks updated successfully!!",
                    data: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        taskModel.findByIdAndRemove(req.body.task_id, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Task deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        taskModel.create({
            task_id: req.body.task_id,
            project_id: req.body.project_id,
            task_title: req.body.task_title,
            task_desc: req.body.task_desc,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Task added successfully!!!",
                    data: null
                });

        });
    },
}