const express = require('express')
const app = express();
const path = require('path')
const userModel = require('./models');

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
  res.render("index")
})

app.get('/read', async (req, res)=>{

  let allUser = await userModel.find()
  res.render("read", {user: allUser})
})

app.get('/update/:userid', async (req, res)=>{
  const {userid} = req.params
  let user = await userModel.findOne({_id: userid})
  res.render("update", {user})
})

app.post('/edit/:userid', async (req, res)=>{
  const {userid } = req.params
  const {name, email, image} = req.body
  let userUpdate = await userModel.findOneAndUpdate({_id: userid}, 
  
  {
    name: name,
    email: email, 
    image: image
  }, 
  {new: true}
  )
  res.redirect("/read")
})

app.post('/create', async (req, res)=>{

  let {name, email, image} = req.body  //use req.body when extracting from a form, use req.body when it is dynamic
  let createdUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  })  
    res.redirect('/read')
})


app.get('/delete/:id', async (req, res)=>{
  const {id} = req.params
  const deletedUser = await  userModel.findOneAndDelete({_id: id})

  res.redirect('/read')
})

app.listen(3000, ()=>{
  console.log("Server Running");
})