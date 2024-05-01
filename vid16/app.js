const express = require('express')
const app = express()
const userModel = require('./Models/user')
const postModel = require('./Models/posts')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
  res.send("hey")

})

app.get('/create', async (req, res)=>{
 
  let user = await userModel.create({
    username: "Mon",
    age: 18,
    email: "has@gmail.com"
  })

  res.send(user)

})

app.get('/post/create', async (req, res)=>{
 
  let post = await postModel.create({
      postdata: "This is a post",
      user: "663147ecda6062583b8fd28c",

  })

  let user = await userModel.findOne({_id: post.user})
  user.posts.push(post._id)
  await user.save()
  res.send({post, user})

})



app.listen(3000, ()=>{
  console.log("Server is running");
})