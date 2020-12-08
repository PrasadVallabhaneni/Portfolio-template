const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
// const nodemailer = require("nodemailer");
require("dotenv").config();

const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const app = express();
const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbURL);
    let db = clientInfo.db("User_profile");
    let data = await db.collection("users").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});
app.put("/form", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbURL);
    let db = clientInfo.db("User_profile");
    let data = await db.collection("users").updateOne({id:"1"},{$set:req.body});
    res.status(200).json({ data });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

app.put('/delete/:id',async(req,res)=>{
    try {
      let clientInfo = await mongoClient.connect(dbURL);
      let db = clientInfo.db("User_profile");
      let data = await db
        .collection("users")
        .updateOne({ _id: objectId("5fcc7db5cafc24fc374484c6") }, { $pull: {works:{"title":req.params.id }}});
        if(data){
res.status(200).json({ message: "updated" });
        }
      
      clientInfo.close();
    } catch (error) {
      console.log(error);
      res.send(500);
    }
})
app.put("/deleteSkill/:skill", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbURL);
    let db = clientInfo.db("User_profile");
    let data = await db
      .collection("users")
      .updateOne(
        { _id: objectId("5fcc7db5cafc24fc374484c6") },
        { $pull: { skills:req.params.skill }}
      );
    if (data) {
      res.status(200).json({ message: "updated" });
    }

    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});
app.listen(port,()=>console.log('Your port runs with',port))