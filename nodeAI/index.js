// const express = require("express")
// const app = express()
// const cohere = require("cohere-ai")

// app.use(express.json());
// cohere.init('1bzrkiPRoGvWmi6yggmIIiO3TT6vbqNVqbVoa43a');

// app.get("/", (req, res)=>{
//   res.send("Test message")
// })

// app.get("/test", async (req,res)=>{
//   const generateRes = await cohere.generate({
//     model: "large",
//     prompt: "Who invented the first plane?",
//     max_tokens: 50,
//     temperature:1
//   })

//   res.send(generateRes)
// })

// app.listen(3002,()=>{
//   console.log("The backend is running")
// })

const express = require("express");
const app = express();
const { CohereClient } = require('cohere-ai');


app.use(express.json());

const cohere = new CohereClient({
  token: "1bzrkiPRoGvWmi6yggmIIiO3TT6vbqNVqbVoa43a"
});

app.get("/", (req, res) => {
  res.send("Test a message");
});

app.get("/test", async (req, res) => {
  const generate = await cohere.generate({
    prompt: 'Who invented the bike?',
  });

  res.send(generate.generations[0].text);
 
});

app.listen(3002, () => {
  console.log("The backend is running");
});
