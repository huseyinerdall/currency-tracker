require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.get("/",(req,res)=>{
    res.send("lşşşşşşşşşş")
})
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB Connected!!!")
})
.catch((err) =>{
    console.log(err)})
const db = mongoose.connection;


app.listen(process.env.PORT,()=>{
    console.log(`app listening on ${process.env.PORT}`)
})