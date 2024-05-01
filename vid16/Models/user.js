const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/vid16`)

const userSchema = mongoose.Schema({
  username: String, 
  email: String, 
  posts:[ //array of ID's
    {
      type: mongoose.Schema.Types.ObjectId, // this shows that it is of type objectID
      ref: 'post' //the ref is of post schema
    }
  ],
  age: Number 
})

module.exports = mongoose.model("User", userSchema)