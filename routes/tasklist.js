var express = require('express');
var Tasklist = require('../models/user_tasklists.model.js');
const tasklistController = require('../controller/tasklist');
const {
    check,
    validationResult
} = require('express-validator/check');
var router = express.Router();


//To fetch all the Tasklists of a project
router.get('/:tasklist_id', [
    check('tasklist_id').isLength({
        min: 3
    }),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    Tasklist.find({
        tasklist_id: req.params.tasklist_id
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

//To Create New Tasklists
router.post('/create', [
    check('tasklist_id').isLength({
        min: 3
    }),
    check('project_id').isLength({
        min: 3
    }),
    check('milestone_id').isLength({
        min: 3
    }),
    check('tasklist_name', 'TaskList Name must be mentioned').contains(),
    check('status').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    const tasklist = new Tasklist({
        tasklist_id: req.body.tasklist_id,
        project_id: req.body.project_id,
        milestone_id: req.body.milestone_id,
        tasklist_name: req.body.tasklist_name,
        desc: req.body.desc,
        created: req.body.created,
        updated: req.body.updated,
        status: req.body.status
    });

    // Save Tasklists in the database
    tasklist.save().then(data => {

        var response = {};

        if (data) {
            response.status = true;
            response.message = "Tasklists created Successfully..";
            response.data = data;

        } else {
            response.status = false;
            response.message = "Tasklists not created..";
        }
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tasklists for the projects."
        });
    });
});


// To change/modify tasklists
router.put('/:tasklist_id', [

    check('tasklist_name', 'TaskList Name must be provided').contains(),
    check('status').isInt(),
    check('updated').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    var conditions = {
            tasklist_id: req.params.tasklist_id
        },

        updateCols = {

            tasklist_name: req.body.tasklist_name,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status
        }

    Tasklist.update(conditions, updateCols)
        .then((data) => {

            var response = {};

            console.log(data);
            if (data) {
                response.status = true;
                response.data = data;
                response.message = "success";
            } else {
                response.status = false;
                response.message = "fail";
            }
            res.send(response);

        }).catch((err) => {
            console.log(err)
        });

});
// To delete tasklists based on the Tasklist id
router.delete('/:tasklist_id', [

    check('tasklist_id', 'Id should be valid').isEmpty()

], (req, res) => {

    var response = {};

    Tasklist.remove({
            tasklist_id: req.params.tasklist_id
        })
        .then(data => {
            console.log(data);
            if (data.ok = 1 && data.n > 0) {
                response.status = true;
                response.message = "Tasklist successfully deleted..";
            } else {
                response.status = false;
                response.message = "Tasklist Deletion Failed..";
            }

            res.send(response);

        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;