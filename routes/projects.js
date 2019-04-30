var express = require('express');
var Projects = require('../models/projects.model.js');
const projectController = require('../controller/project');
const {
    check,
    validationResult
} = require('express-validator/check');

var router = express.Router();


//To fetch specific project
router.get('/:project_id', [
    check('project_id').isLength({
        min: 3
    }),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    // Validate the Request
    // if (!req.body.project_id) {
    //     return res.status(400).send({
    //         message: "Project id  can not be blank"
    //     });
    // }

    Projects.find({
        project_id: req.params.project_id
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
router.post('/create', [
    check('project_id').isLength({
        min: 3
    }),
    check('Project_name', 'Name should be valid').isEmpty(),
    check('status').isInt(),
    check('budget').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }


    const project = new Projects({
        project_id: req.body.project_id,
        project_name: req.body.project_name,
        project_desc: req.body.project_desc,
        created: req.body.created,
        updated: req.body.updated,
        status: req.body.status,
        budget: req.body.budget
    });

    // Save Users in the database
    project.save().then(data => {

        var response = {};

        if (data) {
            response.status = true;
            response.message = "Project created Successfully..";
            response.data = data;

        } else {
            response.status = false;
            response.message = "Project not created..";
        }
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Project."
        });
    });

});


// To change/modify projects
router.put('/:project_id', [

    check('Project_name', 'Name should be valid').isEmpty(),
    check('status').isInt(),
    check('budget').isInt(),
    check('project_desc').contains(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    var conditions = {
            project_id: req.params.project_id
        },
        updateColumns = {
            project_name: req.body.project_name,
            status: req.body.status,
            budget: req.body.budget,
            created: req.body.created
        }

    console.log('params', req.params);
    console.log('body', req.body);
    Projects.update(conditions, updateColumns)
        .then((data) => {

            var response = {};

            console.log(data);

            if (data.ok = 1) {
                response.status = true;
                response.data = data;
                response.message = "success";
            } else {
                response.status = false;
                response.message = "fail";
            }
            res.send(response);

        }).catch((err) => {
            reject(err);
        });

});
// To delete projects based on the Project id
router.delete('/:project_id', [

    check('project_id', 'Id should be valid').isEmpty()

], (req, res) => {

    var response = {};

    Projects.remove({
            project_id: req.params.project_id

        })
        .then(data => {
            console.log(data);
            if (data.ok = 1) {
                response.status = true;
                response.message = "success";
            } else {
                response.status = false;
                response.message = "fail";
            }

            res.send(response);

        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;