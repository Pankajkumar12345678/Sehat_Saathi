const express = require("express");
const cors= require('cors')
require('dotenv').config()
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");

const app = express();

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))


app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies


const dbURI = "mongodb+srv://pankaj22jics073:PankajJiet1234@emailsaurh.srrp5.mongodb.net/EmailAuth?retryWrites=true&w=majority&appName=EmailsAurh";
const port = process.env.PORT || 5000;

app.use(authRoutes);
app.use(registerRoute);
app.use(doctorRoute);
app.use(patientRoutes);
app.use(adminRoutes);
app.use(logoutRoute);

async function connectDB(){
  try{
      await mongoose.connect(dbURI)
      console.log("Connected to DB");
  }
  catch(err){
      console.log(err);
  }
}

  app.listen(port, () => {
    connectDB()
    console.log("Server is running on port: ", port);
  });


