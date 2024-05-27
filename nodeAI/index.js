const express = require("express");
const app = express();
const { CohereClient } = require('cohere-ai');


app.use(express.json());

const cohere = new CohereClient({
  token: process.env.COHERE_API
});

app.get("/", (req, res) => {
  res.send("Test a message");
});

app.get("/test", async (req, res) => {
  const generate = await cohere.generate({
    prompt: 'What is a v6?',
  });

  res.json({message: generate.generations[0].text});
 
});

app.listen(3002, () => {
  console.log("The backend is running");
});
