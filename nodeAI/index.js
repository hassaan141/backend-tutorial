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
  const generate = await cohere.generate({
    prompt: 'Can you put a v8 engine on a wheelchair?',
  });

  res.json({message: generate.generations[0].text});
 
});

app.listen(3002, () => {
  console.log("The backend is running");
});
