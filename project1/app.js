const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path')
const userModel = require('./models/user')
const postModel = require('./models/post');
const crypto = require("crypto")
const multer = require("multer")
const upload = require('./config/multerConfig')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res)=>{
  res.render("index")

})

app.get('/profile/upload', isLoggedIn, (req, res)=>{
  res.render("profileupload")

})

app.get('/explore', async (req, res)=>{
  const allPost = await postModel.find()
  console.log(allPost);
  res.render("expolore", {allPost: allPost})
})

app.post('/upload', isLoggedIn, upload.single("images"), async (req, res)=>{ //put upload.single() and inside put the name of your field, in our case it is image
  console.log(req.file);
  let user = await userModel.findOne({email: req.user.email})
  user.profilepic = req.file.filename
  res.redirect("/profile")
})

app.get('/login', (req, res)=>{
  res.render("login")

})

app.get('/profile', isLoggedIn, async (req, res)=>{
  let user = await userModel.findOne({email: req.user.email}).populate("posts") 
 //posts is the array we are populating when we create a new post
 let publicProf = await postModel.find();
 console.log(publicProf)
 console.log(req.user);
 console.log(user);
  res.render("profile", {user: user, publicProf: publicProf})
})

app.get('/like/:id', isLoggedIn, async (req, res)=>{
  let post = await postModel.findOne({_id: req.params.id}).populate("user") 
  

  if (post.likes.indexOf(req.user.userid)=== -1){
    post.likes.push(req.user.userid)
  } else{
    post.likes.splice(post.likes.indexOf(req.user.userid), 1)
  }

  await post.save()
  res.redirect("/profile")
})

app.get('/edit/:id', isLoggedIn, async (req, res)=>{
  let post = await postModel.findOne({_id: req.params.id}).populate("user") 
  console.log(post.content);
  res.render("editPage", {post: post})

})

app.post('/update/:id', isLoggedIn, async (req, res)=>{
  let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content}) 

  res.redirect("/profile")

})

app.post('/post', isLoggedIn, async (req, res)=>{
  const {content} = req.body
  let user = await userModel.findOne({email: req.user.email})

  let post = await postModel.create({
    user:user._id, 
    content,

  });

  user.posts.push(post._id)
  await user.save()
  res.redirect("/profile")

})


app.get('/logout', (req, res)=>{
  res.cookie("token", "")
  res.redirect("/login")

})

app.post('/register', async (req, res)=>{
  const {name, username, email, password, age} = req.body

  let user = await userModel.findOne({email: email})
  if (user) return res.status(500).send("User Already Created")
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, async (err, hash)=>{
      let user = await userModel.create({
        name, 
        username, 
        email, 
        password: hash, 
        age,
      })
      let token = jwt.sign({email: email, userid: user._id}, "secret")
      res.cookie("token", token)
      res.redirect("/profile")
    })
  })
})

app.post('/login', async (req, res)=>{
  const {email, password} = req.body

  let user = await userModel.findOne({email: email})
  if (!user) return res.status(500).send("No Account Created Yet")
 
  bcrypt.compare(password, user.password, (err, result)=>{
    if (result) {
      let token = jwt.sign({email: email, userid: user._id}, "secret")
      res.cookie("token", token)
      res.status(200).redirect("/profile")
    
    }
    else{res.redirect('/login')}
  })

})

//middleware for protected routes
function isLoggedIn (req, res, next){
  if(req.cookies.token === "") res.redirect("/login");
  else{
    let data = jwt.verify(req.cookies.token, "secret") //verify is to get the data of the person that is logged in
    req.user = data
    next();
  }

}

app.listen(3000, ()=>{
  console.log("Server is running");
})