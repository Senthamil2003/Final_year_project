const config = require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./Connection")
const bodyParser = require("body-parser");
const CORS = require("cors")
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ResumeParser = require('simple-resume-parser');
app.use(CORS());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { Configuration, OpenAIApi } = require("openai");
const { error } = require("console");


let isProcessing = false;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini_api_key = "AIzaSyBHbQhbhN55b1RR00vbUfgeoVoAZgAuj6s";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});



const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

const upload = multer({ dest: 'uploads/' });

app.get("/", async (req, res) => {
  res.send("welcome")

})
app.post("/genai", async (req, res) => {

  const { input } = req.body;
  console.log(input)
  try {
    // const response = await openAi.createChatCompletion({
    //   model: "gpt-3.5-turbo",


    //   messages: [{ role: "user", content: input }],
    // })
    const result = await geminiModel.generateContent(input)
    console.log(result.response.text())
    // console.log(result.data.choices[0].message.content)
    res.json(result.response.text());
  }
  catch (err) {
    console.error("Error :" + err);
    res.status(500).send(err)
  }

})
app.post("/signup", async (req, res) => {

  const { name, mail, password } = req.body;
  console.log("hi")
  console.log(name, mail, password)
  try {
    const items = await db.promise().query("insert into user (name,password,mail) values(?,?,?)", [name, password, mail]);
    res.send("success")
  }
  catch (err) {
    res.status(500).send(err)
  }

})
app.post("/login", async (req, res) => {

  const { mail, password } = req.body;
  console.log(mail, password)

  try {
    const users = await db.promise().query("select * from user where mail=?  and password=?", [mail, password]);
    res.json(users)
  }
  catch (err) {
    res.status(500).send(err)
  }

})

app.post("/resumeExtraction", upload.single('resume'), (req, res) => {
  // const ResumeParser = require('simple-resume-parser');
  // const resume = new ResumeParser(req.file.path);
  // const resume = new ResumeParser("./uploads/first.pdf")
  // const resumeFilePath = path.join(__dirname, req.file.path); 
  // const resume = new ResumeParser(resumeFilePath);

  const newFilePath = path.join(__dirname, 'uploads', `${req.file.filename}.pdf`);
  fs.renameSync(req.file.path, newFilePath);
  const resume = new ResumeParser(newFilePath);
  // console.log(resume)
  resume.parseToJSON()
    .then(data => {
      // console.log('Yay! ', data);
      resume_skill_string = data.parts.skills;
      // console.log(resume_skill_string)
      technology_skills = [
        'Data Structures',
        'Algorithms',
        'C',
        'C++',
        'Java',
        'Python',
        'JavaScript',
        'HTML',
        'CSS',
        'Bootstrap',
        'Node.js',
        'Express.js',
        'React',
        'Angular',
        'Vue.js',
        'Django',
        'Flask',
        'MongoDB',
        'MySQL',
        'PostgreSQL',
        'Firebase',
        'Git',
        'GitHub',
        'Object-Oriented Programming (OOP)',
        'RESTful APIs',
        'GraphQL',
        'Web Development',
        'Mobile Development',
        'Cloud Computing',
        'Machine Learning',
        'Artificial Intelligence',
        'Natural Language Processing (NLP)',
        'Computer Vision',
        'Big Data',
        'Blockchain',
        'Cybersecurity',
        'Software Testing',
        'Agile Methodologies',
        'Scrum',
        'DevOps',
        'Unity'
      ]

      const extracted_skills = technology_skills.filter(skill => resume_skill_string.includes(skill));

      // Log the extracted skills
      // console.log('Extracted Technology Skills:', extracted_skills);
      res.send(extracted_skills)

    })
    .catch(error => {
      console.error("Error :" + error);
    });

})




app.post("/addReport", async (req, res) => {
  const { input, id, skill } = req.body;
  // console.log(skill)
  const currentDate = new Date();

  // Extract date and time components
  const date = currentDate.toISOString().slice(0, 10); // Extract date in 'YYYY-MM-DD' format
  const hours = ('0' + currentDate.getHours()).slice(-2); // Extract hours (with leading zero if necessary)
  const minutes = ('0' + currentDate.getMinutes()).slice(-2); // Extract minutes (with leading zero if necessary)

  // Combine hours and minutes into time format
  const time = hours + ':' + minutes;
  // const time = currentDate.toISOString().slice(11, 19); // Extract time in 'HH:MM:SS' format
  // console.log(time)
  try {
    // const response = await openAi.createChatCompletion({
    //   model: "gpt-3.5-turbo",

    //   messages: [{ role: "user", content: input }],
    // })
    const result = await geminiModel.generateContent(input)

    console.log("start")
    try {
      // Execute the SQL query with parameters
      const items = await db.promise().query("INSERT INTO report (userid, report,skill, date, time) VALUES (?, ?,?, ?,?)", [id, result.response.text(), skill, date, time]);

      // If the query is successful, proceed with your code
      console.log("Data inserted successfully!");
    } catch (error) {
      // If an error occurs during query execution, handle it here
      console.error("Error inserting data:", error.message);
      // Optionally, you can throw the error to propagate it further
      throw error;
    }
    console.log("success");
    // res.json(response.data.choices[0].message.content);
    res.json(result.response.text());
  }
  catch (err) {
    console.error("Error :" + err);
    res.status(500).send(err)
  }



})

app.post("/dashboard", async (req, res) => {

  const { id } = req.body;
  // console.log(id)

  try {
    const data = await db.promise().query("select * from report where userid=?", [id]);
    // console.log(data[0])
    res.json(data[0])
  }
  catch (err) {
    console.error("Error :" + err);
    res.status(500).send(err)
  }

})

app.post("/getFeedback", async (req, res) => {

  const { userid, testid } = req.body;
  // console.log(userid, testid)

  try {
    const data = await db.promise().query("select * from report where userid=? and id=?", [userid, testid]);
    // console.log(data[0])
    res.json(data[0])
  }
  catch (err) {
    console.error("Error :" + err);
    res.status(500).send(err)
  }


})


app.listen(5000, () => {
  console.log("Server running in 5000")
})