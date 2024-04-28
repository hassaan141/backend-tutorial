const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/something`) //connect to whatever server, either locally or using atlas

const userSchema = mongoose.Schema({ //create a schema for your object
  name: String,
  username: String,
  email: String
})

module.exports = mongoose.model('user', userSchema) //This creates a DB called user and you pass in your schema, and you export it

