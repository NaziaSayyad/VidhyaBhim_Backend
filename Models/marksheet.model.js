import mongoose from "mongoose"

const marsheet_schema = new mongoose.Schema({
    name : String,
    phone: Number,
    fname : String,
    semester: Number,
    BatchNo: Number,
    session: String,
    course: [
        {
            subjectcode: Number,
            subject: String,
            MAX: Number,
            PASS:Number,
            obtained: Number
        }
    ],
    enroll: String,
    DATE: String

})
export const marksheet = mongoose.model("marksheet",marsheet_schema)