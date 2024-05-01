const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path')
const userModel = require('./models/user')
const postModel = require('./models/post')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res)=>{
  res.render("index")

})

app.get('/login', (req, res)=>{
  res.render("login")

})

app.post('/register', (req, res)=>{
  const {name, username, email, password, age} = req.body

  let user = userModel.findOne({email: email})
  if (user) return res.status(500).send("User Already Created")
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, async (err, hash)=>{
      let registerUser = await userModel.create({
        name, 
        username, 
        email, 
        password: hash, 
        age,
      })
      let token = jwt.sign({email: email, userid: user._id}, "secret")
      res.cookie("token", token)
      res.send("User is registered")
    })
  })
})

app.post('/login', (req, res)=>{
  const {email, password} = req.body

  let user = userModel.findOne({email: email})
  if (!user) return res.status(500).send("No Account Created Yet")
 
  bcrypt.compare(password, user.password, (err, result)=>{
    if (result) res.status(200).send("You have successfully loged in")
    else{res.redirect('/login')}
  })

})


app.listen(3000, ()=>{
  console.log("Server is running");
})