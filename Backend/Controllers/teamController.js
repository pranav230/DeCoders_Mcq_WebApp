const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

const teamInfoSchema = require('../models/teamInfo');
mongoose.connect('mongodb://localhost/Decoders');

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
        mobile2: req.body.mobile2
    });

    newTeamInfo.save().then(addedTeamData => {
        res.status(201).json({
            message: "success"
        })
    })
})

module.exports = router;