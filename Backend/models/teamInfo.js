const mongoose = require('mongoose');

const teamInfoSchema = mongoose.Schema({
    teamName: { type: String, required: true },
    name1: { type: String, required: true },
    usn1: { type: String, required: true },
    email1: { type: String, required: true },
    mobile1: { type: String, required: true },
    name2: { type: String },
    usn2: { type: String },
    email2: { type: String },
    mobile2: { type: String },
    score: { type: String, default: null }
});

module.exports = mongoose.model("teamInfo", teamInfoSchema);