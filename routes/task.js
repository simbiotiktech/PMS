var express = require('express');
var Tasks = require('../models/user_tasks.model.js');
const taskController = require('../controller/task');
const {
    check,
    validationResult
} = require('express-validator/check');
var router = express.Router();

// To fetch all the tasks
router.get('/', [
    check('task_id').contains(),
], (req, res) => {

    const errors = validationResult(req);
    //console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    res.json({
            message: "All the Tasks of a project are found!!!"
        }),
        res.json(Tasks);
});

//To fetch specific task based on task_id
router.get('/:task_id', [
    check('task_id').isLength({
        min: 3
    }),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    Tasks.find({
        task_id: req.params.task_id
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

//To Create New Task
router.post('/create', [
    check('task_id').isLength({
        min: 3
    }),
    check('project_id').isLength({
        min: 3
    }),
    check('task_title', 'Task title should be given').contains(),
    check('status').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    const task = new Tasks({
        task_id: req.body.task_id,
        project_id: req.body.project_id,
        task_title: req.body.task_title,
        task_desc: req.body.task_desc,
        created: req.body.created,
        updated: req.body.updated,
        status: req.body.status
    });

    // Save Users in the database
    task.save().then(data => {

        var response = {};

        if (data) {
            response.status = true;
            response.message = "Tasks created Successfully..";
            response.data = data;

        } else {
            response.status = false;
            response.message = "Tasks not created..";
        }
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tasks."
        });
    });
});


// To change/modify Tasks
router.put('/:task_id', [

    check('task_id', 'Id must be provided').isLength({
        min: 3
    }),
    check('project_id', 'Project Id must be provided').isLength({
        min: 3
    }),

    check('task_title', 'Task Title must be provided').contains(),
    check('status').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    Tasks
        .update({
            task_id: req.body.task_id,
            project_id: req.body.project_id,
            task_title: req.body.task_title,
            task_desc: req.body.task_desc,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status // field:values to update
        })
        .then((data) => {

            var response = {};


            if (data.ok = 1) {
                response.status = true;
                response.data = data;
                response.message = "Tasks successfully updated..";
            } else {
                response.status = false;
                response.message = "Tasks Updation Fail";
            }
            res.send(response);

        }).catch((err) => {
            reject(err);
        })
});

// To delete tasks based on the Task id
router.delete('/:task_id', [

    check('task_id', 'Id should be valid').isEmpty()

], (req, res) => {
    var response = {};


    Tasks.remove({
            task_id: req.params.task_id
        })
        .then(data => {
            console.log(data);
            if (data.ok = 1 && data.n > 0) {
                response.status = true;
                response.message = "Tasks successfully deleted..";
            } else {
                response.status = false;
                response.message = "Tasks Deletion Failed..";
            }

            res.send(response);

        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;