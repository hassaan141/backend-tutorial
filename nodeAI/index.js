const express = require("express");
const app = express();
const { CohereClient } = require('cohere-ai');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cohere = new CohereClient({
  token: process.env.COHERE_API
});

app.get("/", (req, res) => {
  res.send("Please work");
});

app.post("/test", async (req, res) => { // Change to POST
  const ask = req.body.question; // Access the question from the parsed body
  console.log(ask);

  const generate = await cohere.generate({
    prompt: ask, // Use the question in the prompt
  });

  res.json({ message: generate.generations[0].text });
});

app.listen(3002, () => {
  console.log("The backend is running");
});
