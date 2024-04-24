const express = require('express')
const app = express();
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public'))) //all the static files, like images, frontend js, go in the public folder, The path.join() gives you the directory name and joins the public folder

app.set('view engine', 'ejs') //backend will show ejs, now just add file names

app.get('/', (req, res)=>{
  // res.send("Working") //you dont have to keep sending 1 line, now you can send html pages
  res.render("index")
})

app.get('/profile/:username', (req, res)=>{ //putting a colon in the route makes it a variable. Colon makes that part dynamic

  //now that you can put any username, you can extract that username
  res.send(req.params.username)
})

//now for muliple layers of route like profile/username/age, you have to make a seperate route for that
app.get('/profile/:username/:age', (req, res)=>{ 
 res.send() 
  res.send(`${req.params.username} +  ${req.params.age}`)
})


app.listen(3000, ()=>{
  console.log("Server Running")
})