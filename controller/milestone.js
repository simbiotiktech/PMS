const MilestoneModel = require('../models/milestone.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        MilestoneModel.findById(req.body.milestone_id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Milestone found!!!",
                    data: {
                        milestone: userInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let milestoneList = [];
        MilestoneModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let milestone of users) {
                    milestoneList.push({
                        milestone_id: milestone.milestone_id,
                        project_id: milestone.project_id,
                        desc: milestone.desc,
                        status: milestone.status
                    });
                }
                res.json({
                    status: "success",
                    message: "Milestone list found!!!",
                    data: {
                        milestone: usersList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        MilestoneModel.findByIdAndUpdate(req.body.milestone_id, {
            project_id: req.body.project_id
        }, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "milestone updated successfully!!!",
                    data: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        MilestoneModel.findByIdAndRemove(req.body.milestone_id, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Milestone deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        MilestoneModel.create({
            milestone_id: req.body.milestone_id,
            milestone_name: req.body.milestone_name,
            project_id: req.body.project_id,
            status: req.body.status
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Milestone added successfully!!!",
                    data: null
                });

        });
    },

}