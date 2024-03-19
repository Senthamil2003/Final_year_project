const config=require("dotenv").config();
const express = require("express");
const app = express();
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

app.get("/",async (req,res)=>{
  res.send("welcome")

})
app.post("/genai", async(req,res)=>{
  
  const { input } = req.body;
  // console.log(input)
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
  // res.send("jo")
})


app.listen(5000,()=>{
  console.log("Server running in 5000")
})