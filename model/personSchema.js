const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    "Name of the Candidate": String,
    "Email": {
        type: String, 
        // unique:true
    },
    "Mobile No.": String,
    "Date of Birth": String,
    "Work Experience": String,
    "Resume Title": String,
    "Current Location": String,
    "Postal Address": String,
    "Current Employer": String,
    "Current Designation": String
});

module.exports = mongoose.model("Person", personSchema);