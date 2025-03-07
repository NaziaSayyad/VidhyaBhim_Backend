import mongoose from "mongoose"

const marsheet_schema = new mongoose.Schema({
    name : String,
    phone: Number,
    fname : Number,
})
export const marksheet = mongoose.model("marksheet",marsheet_schema)