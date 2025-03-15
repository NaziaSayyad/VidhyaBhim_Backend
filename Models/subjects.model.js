const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    streamname : String,
    coursename : String,
    semester : Number,
    subjectcode: Number,
   totalmarks : Number,
    passingmarks : Number,
    theorymarks : Number,
    subjectname:String,
    status:String
})
const Subject_model = mongoose.model('subject',subjectSchema);
module.exports = Subject_model
