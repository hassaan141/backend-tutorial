const express = require("express");
const app = express();
const { CohereClient } = require('cohere-ai');
require('dotenv').config();


app.use(express.json());

const cohere = new CohereClient({
  token: process.env.COHERE_API
});

app.get("/", (req, res) => {
  res.send("Test a message");
});

app.get("/test", async (req, res) => {
  const ask = req.body.params
  console.log(questions)
  const generate = await cohere.generate({
    prompt: 'is a v2 engine strong enough to build a small airplane?',
  });

  res.json({message: generate.generations[0].text});
 
});

app.listen(3002, () => {
  console.log("The backend is running");
});
