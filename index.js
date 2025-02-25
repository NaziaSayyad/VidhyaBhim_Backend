// Backend 
const express = require("express");
const { default: mongoose } = require("mongoose");
const PORT = 8080;
const DB_URL = `mongodb+srv://vidhyadb:12345@cluster0.w1fpi.mongodb.net/vidhyabhim`
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const connect = async () =>{
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
// student_data
const StudentSchema = new mongoose.Schema({
    name : String,
    email : String,
    fphone: { type: String, required: true, unique: true }
})

const student = mongoose.model("Student", StudentSchema);
app.get("/students", async(req, res ) =>{
    try {
        const students = await student.find();
        res.json(students);
    }
    catch (error){
   res.status(500).json({message : "Error Fetching student data"})
    }
});
// Marksheet_data
const MarksheetSchema = new mongoose.Schema({
    name : String,
    phone: Number,
    fname : Number,

    
})
const marksheet = mongoose.model("marksheet",MarksheetSchema)
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
})
app.get("/students/:id", async (req,res) =>{
     try{
       const  {id} = req.params;
        console.log(id);
        const studentData = await student.findOne({id : Number(id) });
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
})

    
    
// app.get("/certificate:fphonelnumber", async (req,res) =>{
//     // entities need : studentname, fname, semester, 
//     // 
//     try{
//        const  {fphonelment_number} = req.params;
//     const student = await student.findOne({enrollment_number});

//     if(!student){
//         return res.status(404).json({ success: false, message: "Student not found" });
//     }
//     res.json({ success: true, student });
//         // const st_name = await student.find({}, {studentname : 1 , fname :1, semester : 1, _id:1 });
//         // res.json(st_name);
//     } 
//     catch(error){
//         res.status(500).json({message :  " Error Fetching Certificate data"})
//     }
// })
// course_data
const course_data = new mongoose.Schema({
    id : Number,
    coursename : String,
    streamname : String,
    semester : Number,
    duration : String,
    fees : Number,
    status : String   
})
const course_model = mongoose.model("course", course_data);
app.get("/course", async (req,res) =>{
    // entities need : studentname, fname, semester, 
    try{
       const data = await course_model.find();
       res.json(data);
   } catch (error){
    res.send(error)
   }
})




app.get("/", async(req,res) => {
    res.send("API is running")
});
app.listen(PORT, async() => {
    await connect ();
    console.log(`listening to localhost${PORT} and the database is:${DB_URL}`);
});
