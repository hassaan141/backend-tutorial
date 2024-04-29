const express = require('express')
const app = express();
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
  res.render("index")
})

app.get('/read', (req, res)=>{
  res.render("read")
})

app.get('/update', (req, res)=>{
  res.render("update")
})

app.get('/delete', (req, res)=>{
  res.render("delete")
})

app.listen(3000, ()=>{
  console.log("Server Running");
})