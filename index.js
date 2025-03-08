// Backend 
const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080;
const DB_URL = `mongodb+srv://vidhyadb:12345@cluster0.w1fpi.mongodb.net/vidhyabhim`
const app = express();
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const { marksheet } = require("./Models/marksheet.model");
const { course_model } = require("./Models/course.model");
const Student = require("./Models/student.model");
const student = require("./Models/student.model");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Setup Multer for file uploads

const storage = multer.diskStorage({
    destination: "./Documents/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



const connect = async () =>{
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

app.get("/students", async(req, res ) =>{
    try {
        const students = await Student.find();
        res.json(students);
    }
    catch (error){
   res.status(500).json({message : "Error Fetching student data"})
    }
});
// Adding students 
app.post("/addstudent",  upload.fields([
    { name: "photo" }, { name: "sign" }, { name: "doc1" },
    { name: "doc2" }, { name: "doc3" }, { name: "doc4" }
]), async (req, res) => {

    try {
        const { email, phone, ...studentData } = req.body;
            // Check if student exists
        const existingStudent = await Student.findOne({ email, phone });
        if (existingStudent) {
            return res.status(400).json({ message: "Student already exists." });
        }

        // Check required fields
        // if (Object.values(studentData).some(val => val === "")) {
        //     return res.status(400).json({ message: "Please enter all details." });
        // }

        // Save file paths
        const files = req.files || {}
        studentData.photo = files["photo"] ? files["photo"][0].path : "";
        studentData.sign = files["sign"] ? files["sign"][0].path : "";
        studentData.doc1 = files["doc1"] ? files["doc1"][0].path : "";
        studentData.doc2 = files["doc2"] ? files["doc2"][0].path : "";
        studentData.doc3 = files["doc3"] ? files["doc3"][0].path : "";
        studentData.doc4 = files["doc4"] ? files["doc4"][0].path : "";

        const newStudent = new Student({ email, phone, ...studentData });
        await newStudent.save();

        res.status(201).json({ data : newStudent, message: "Student added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/marksheet", async(req, res ) =>{
    try {
        const Marksheets = await marksheet.find();
        res.json(Marksheets);
    }
    catch (error){
   res.status(500).json({message : "Error Fetching student data"})
    }
});
app.get("/marksheet/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        // console.log(id);
        const Marksheet_data = await marksheet.findOne({id : Number(id) });
        res.send( Marksheet_data);
    } 
    catch (error) {
        res.status(500).json({ message: "Eroor fetching the data" });
        }
});
app.get("/students/:id", async (req,res) =>{
     try{
       const  {id} = req.params;
        console.log(id);
        const studentData = await Student.findOne({id : Number(id) });
        console.log(studentData, "finding value");
        
        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.send({
            message: `Working, the value is .....${id}`,
            json: studentData,
        });
     }
    catch(error){
        res.status(500).json({message :  " Error Fetching Certificate data"})
    }
});
app.get("/course", async (req,res) =>{
    try{
       const data = await course_model.find();
       res.json(data);
   } catch (error){
    res.send(error)
   }
});

app.get("/", async(req,res) => {
    res.send("API is running")
});
app.listen(PORT, async() => {
    await connect ();
    console.log(`listening to localhost${PORT} and the database is:${DB_URL}`);
});
