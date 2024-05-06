const multer = require('multer')
const path = require('path') //for the path variable
const crypto = require('crypto') //for the random name

//disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    //the second param, file has all the data on the file, the data, size, ext, everything
    crypto.randomBytes(12, (err, name)=>{

      //all you are doing now is from file, getting the original name, so you can do path.extname to get the file extension.
      const fileName = name.toString("hex")+path.extname(file.originalname)//this gives you a random string of bytes which you convert to hexadecimal and then you add the file extension by doing file.orginalname, and getting the extname
      cb(null, fileName) // to set the file name
    })
  }
})


//upload variable

const upload = multer({ storage: storage })


//export upload variable

module.exports = upload