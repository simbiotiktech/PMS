const projectModel = require('../models/projects.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        projectModel.findById(req.body.project_id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Project found!!!",
                    data: {
                        projects: userInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let projectList = [];
        projectModel.find({}, function (err, users) {
            if (err) {
                next(err);
            } else {
                for (let project of users) {
                    usersList.push({
                        project_id: projects.project_id,
                        project_name: projects.project_name,
                        project_desc: projects.project_desc
                    });
                }
                res.json({
                    status: "success",
                    message: "Projects list found!!!",
                    data: {
                        project: usersList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        projectModel.findByIdAndUpdate(req.body.project_id, {
            project_name: req.body.project_name
        }, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "project updated successfully!!!",
                    data: userInfo
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        projectModel.findByIdAndRemove(req.body.project_id, function (err, userInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Project deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        projectModel.create({
            project_name: req.body.project_name,
            project_desc: req.body.project_desc,
            status: req.body.status,
            budget: req.body.budget
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Project added successfully!!!",
                    data: null
                });

        });
    },
    login: function (req, res, next) {
        projectModel.findOne({
            project_id: req.body.project_id
        }, {
            project_name: req.body.project_name
        }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                //console.log(req.body.password);
                // console.log( userInfo.password);
                console.log(req.body);

                if (bcrypt.compareSync(req.body.project_id, userInfo.project_id)) {
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
                        message: "Invalid Project Id/Name!!!",
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