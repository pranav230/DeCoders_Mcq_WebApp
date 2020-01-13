const path = require("path");
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = express.Router();

const teamController = require('./Controllers/teamController');
const questionController = require('./Controllers/questionController');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST, PATCH, DELETE, OPTIONS")
    next();
});

app.use('/teamInfo', teamController);
app.use('/question', questionController);
app.get('/', (req, res, next) => {
    res.status(200).json({
        name: 'Decoders'
    })
})

module.exports = app;