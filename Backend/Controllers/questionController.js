const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

const questionSchema = require('../models/question');

router.post('', (req, res, err) => {
    console.log("sasasasas", req.body);

    var newQuestion = new questionSchema({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        correctAns: req.body.correctAns
    });

    newQuestion.save().then(addedQuestionData => {
        res.status(201).json({
            message: "success"
        });
    })

});

module.exports = router;