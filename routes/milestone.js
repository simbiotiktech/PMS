var express = require('express');
var Milestone = require('../models/milestone.model.js');
const milestoneController = require('../controller/milestone');
const {
    check,
    validationResult
} = require('express-validator/check');
var router = express.Router();


//To fetch specific Milestone for the project
router.get('/:milestone_id', [
    check('milestone_id').isLength({
        min: 3
    }),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    Milestone.find({
        milestone_id: req.params.milestone_id
    }).then((data) => {
        var response = {};


        if (data) {

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

//To create New Milestone
router.post('/create', [
    check('milestone_id').isLength({
        min: 3
    }),
    check('project_id').isLength({
        min: 3
    }),
    check('Milestone_name', 'Name should be valid').isEmpty(),
    check('status').isInt(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    const milestone = new Milestone({
        milestone_id: req.body.milestone_id,
        project_id: req.body.project_id,
        milestone_name: req.body.milestone_name,
        desc: req.body.desc,
        created: req.body.created,
        updated: req.body.updated,
        status: req.body.status
    });

    // Save Users in the database
    milestone.save().then(data => {

        var response = {};

        if (data) {
            response.status = true;
            response.message = "Milestone created Successfully..";
            response.data = data;

        } else {
            response.status = false;
            response.message = "Milestone not created..";
        }
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Milestone for Project."
        });
    });
});


// To change/modify Milestones
router.put('/:milestone_id', [

    check('milestone_name', 'Milestone Name should be valid').contains(),
    check('status').isInt(),
    check('desc').contains(),
], (req, res) => {

    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }

    var conditions = {
            milestone_id: req.params.milestone_id
        },

        updateCols = {

            milestone_name: req.body.milestone_name,
            created: req.body.created,
            updated: req.body.updated,
            status: req.body.status
        }

    Milestone.update(conditions, updateCols)
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
// To delete Milestones based on the Milestone id
router.delete('/:milestone_id', [

    check('milestone_id', 'Id should be valid').isEmpty()

], (req, res) => {

    var response = {};

    Milestone.remove({
            milestone_id: req.params.milestone_id
        })
        .then(data => {
            console.log(data);
            if (data.ok = 1 && data.n > 0) {
                response.status = true;
                response.message = "Milestone successfully deleted..";
            } else {
                response.status = false;
                response.message = "Milestone Deletion Failed..";
            }

            res.send(response);

        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;