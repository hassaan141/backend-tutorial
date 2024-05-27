const express = require("express")
const app = express()

app.use(express.json());

app.get("/", (req, res)=>{
  res.send("Test message")
})

//1bzrkiPRoGvWmi6yggmIIiO3TT6vbqNVqbVoa43a
app.listen(3002,()=>{
  console.log("The backend is running")
})