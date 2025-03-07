import mongoose from "mongoose";

const course_data = new mongoose.Schema({
    id : Number,
    coursename : String,
    streamname : String,
    semester : Number,
    duration : String,
    fees : Number,
    status : String   
})
export const course_model = mongoose.model("course", course_data);