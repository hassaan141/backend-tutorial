const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


app.use(cookieParser())

app.get('/', (req, res)=>{

  let token = jwt.sign({ email: 'hassaan@gmail.com' }, 'secret'); //secret is going to encrypt the email, if secret is found, you can dcrypt any data
  res.cookie("token", token)
  res.send(token);

})

app.get('/read', (req, res)=>{

  res.send(req.cookies.token); //you can get the token from herer

  // and to verify the token do this

  let data = jwt.verify(req.cookies.token, "secret")
  console.log(data);
})


app.listen(3000, ()=>{
  console.log("Server is running");
})