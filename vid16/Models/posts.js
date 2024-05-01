const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // this shows that it is of type objectID
    ref: 'User' //the ref is of User schema
  }, 
  postdata: String, 
  date:{
    type:Date, 
    default: Date.now
  }
})

module.exports = mongoose.model("post", postSchema)