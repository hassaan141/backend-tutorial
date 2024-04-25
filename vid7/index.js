const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res)=>{
  fs.readdir(`./files`, (err, files)=>{ //we will put res.render when reading happens
    console.log(files);
    res.render("pg1", {files: files}) //you are also sending to pg1 the file that we get
  })
})

app.post('/create', (req, res)=>{
 console.log(req.body);
 fs.writeFile(`./files/${req.body.title.replaceAll(' ', '')}.txt`, 
    req.body.body, 
    (err)=>{
      res.redirect('/')
    })
})

app.get('/file/:filename', (req, res)=>{
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata)=>{
    res.render('readmore', {filedata: filedata, filename: req.params.filename});
  })
})

app.listen(3000, ()=>{
  console.log('Server is running away');
})