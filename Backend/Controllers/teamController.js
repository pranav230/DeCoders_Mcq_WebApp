const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DeCoders');

const teamInfoSchema = require('../models/teamInfo');

router.post('', (req, res, err) => {
    console.log(req.body);
    var newTeamInfo = new teamInfoSchema({
        teamName: req.body.teamName,
        name1: req.body.name1,
        usn1: req.body.usn1,
        email1: req.body.email1,
        mobile1: req.body.mobile1,
        name2: req.body.name2,
        usn2: req.body.usn2,
        email2: req.body.email2,
        mobile2: req.body.mobile2,
        score: 0
    });

    newTeamInfo.save().then(addedTeamData => {
        res.status(201).json({
            message: "success",
            teamID: addedTeamData._id
        })
    })
});

router.put('', (req, res, err) => {
    console.log("inside score update", req.body);
    teamInfoSchema.findByIdAndUpdate(req.body.teamID, {
            $set: { score: req.body.score }
        }, {
            new: true
        },
        function(err, updatedScore) {
            if (err) {
                res.send("Error updating imagePath");
            } else {
                res.json({
                    message: "success",
                    data: updatedScore
                })
            }
        }
    )

})

module.exports = router;