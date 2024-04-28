//download express and mongoose 

//mogoose helps us to communicate between mongoDB server and node server


//CRUD Operations means create, read, update, delete
const express = require('express')
const app = express()

const userModel = require('./model')

app.get('/', (req, res)=>{
  res.send('hey')
})

app.get('/create', async (req, res)=>{ //this is how u create a user model
  let createdUser = await userModel.create({ //this blcok is code is async
    name: "Muhammad", 
    username: "hassaan141",
    email: "has@gmail.com"

  })

  res.send(createdUser) //NEED AWAIT AND ASYNC

})

app.get('/update', async (req, res)=>{ //this is how u create a user model
  let updatedUser = await userModel.findOneAndUpdate({name: "Muhammad"},{name: "Usman"} , {new: true})
  //use .findOneAndUpdate need 3 things, the old id, the update, and new:true

  res.send(updatedUser)

})

app.get('/read', async (req, res)=>{ //this is how u create a user model
  let readUser = await userModel.find()
  //use .find to read all

  //can use .find and send the exact name to read one thing or can use findOne
  //findOne gies you an object, find gives  you an array

  res.send(readUser)

})

app.get('/delete', async (req, res)=>{ //this is how u create a user model
  let deleteUser = await userModel.findOneAndDelete({name: "Usman"})
  //use .findOneAndDelete

  res.send(deleteUser)

})

app.listen(3000, ()=>{
  console.log("Dont Run Away");
})