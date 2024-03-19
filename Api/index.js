const config=require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./Connection")
const bodyParser = require("body-parser");
const CORS = require ("cors")
app.use(CORS());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
const { Configuration, OpenAIApi } = require("openai");



const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)
// app.post("/check",async(req,res)=>{

//   const { input } = req.body;
//   console.log(input)
//   res.json("ko")
// })
app.get("/",async (req,res)=>{
  res.send("welcome")

})
app.post("/genai", async(req,res)=>{
  
  const { input } = req.body;
  console.log(input)
  try{
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
  
      messages: [{ role: "user", content: input }],
    })
    console.log(response.data.choices[0].message.content)
    res.json(response.data.choices[0].message);
  }
  catch(err){
      res.status(500).send(err)
  }
 
})
app.post("/signup", async(req,res)=>{
  
  const { name, mail, password} = req.body;
  console.log("hi")
  console.log(name,mail,password)
  try{
      const items = await db.promise().query("insert into user (name,password,mail) values(?,?,?)", [name,password,mail]);
      res.send("success") 
  }
  catch(err){
      res.status(500).send(err)
  }
  
})
app.post("/login", async(req,res)=>{

  const { mail,password } = req.body;
 console.log(mail,password)
  
  try{
      const users = await db.promise().query("select * from user where mail=?  and password=?",[mail,password]);
      res.json(users) 
  }
  catch(err){
      res.status(500).send(err)
  }
  
})
app.post("/addReport", async(req,res)=>{
  const { input,id } = req.body;
  
  try{
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
  
      messages: [{ role: "user", content: input }],
    })
   
    console.log("start") 
    const items = await db.promise().query("insert into report (userid,report) values(?,?)", [id,response.data.choices[0].message.content]);
    console.log("success");
    res.json(response.data.choices[0].message.content);
  }
  catch(err){
      res.status(500).send(err)
  }

  // try{
  //   const items = await db.promise().query("insert into report (userid,report) values(?,?)", [id,report]);
  //   res.json(items) 
  // }
  // catch(err){
  //     res.status(500).send(err)
  // }
  
})


app.listen(5000,()=>{
  console.log("Server running in 5000")
})