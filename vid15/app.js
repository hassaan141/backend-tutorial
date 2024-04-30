const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path')
const userModel = require('./model')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res)=>{
  res.render("index")

})

app.post('/create', (req, res)=>{
  let  {username, email, password, age} = req.body
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, async (err, hash)=>{

    let createUser = await userModel.create({
      username: username, 
      email:email, 
      password:hash, 
      age:age
    })

    let token = jwt.sign({email: email}, "secret");
    res.cookie("token", token)
    res.send(createUser);
    })
  })

  
})

app.get('/logout', (req, res)=>{

  res.cookie("token", "")
  
  res.redirect('/')
})

app.get('/login', (req, res)=>{
  res.render('login')

})

app.post('/login', async (req, res)=>{
  const {email, password} = req.body
  
  let user = await userModel.findOne({email:email})
  
  bcrypt.compare(password, user.password, (err, result)=>{
    
    if(result){
      let token = jwt.sign({email}, "secret")
      res.cookie("token", token)
      res.send(`welcome ${email}`)
    }else{
      res.send("error")
    }

  })
})

app.listen(3000, ()=>{
  console.log("Server is running");
})