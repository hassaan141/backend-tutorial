// Video 1

var arr = [1, 2, 3, 4]

//For Each

  //go through all the values in the array
  // arr.forEach((val)=>{ //val is going to go through all of the indexes
  //   console.log(val + 2);
  // })


// Map

  //return an array with the same legnth, return what u want
  // let ans = arr.map((val)=>{
  //   return val;//going to return whatever value the amount of times of the length of the array 
  // }) 

// console.log(ans);

//Filter

  //make a new array depending on your specific needs, filtering according to what u want
  //If value is true, then only it is put in an array
  // const ans = arr.filter((val)=>{
  //   if (val>2)
  //     return true
  // })

  // console.log(ans)


//Find
  //Find a certain element in the arr

  // const ans = arr.find((val)=>{
  //     if (val === 2)
  //       return val;
  // })

  // console.log(ans);

  //Index Of

    // const ans = arr.indexOf((val)=>{
    //   if (val === 2)
    //     return val;
    // })

    // console.log(ans);

// Objects
  //are key value pairs

  // var o={
  //   name:"muhammad",
  //   age:19
  // }

  // Object.freeze(o) //makes so the objects are not change able
  // o.age=25
  
  // function are type of objects in javascript, length of a function is the params it has


//Async Coding

  //code running line by line means it is synchronus
  //code running asynchronausly gets sent to the side stack and you resume from the next line, when the sync code is finishied, we see if the side stack is finished, if it is finishhed, bring it back to the main stack
  //async code is processed in the side stack but not executed

// async function a (){
//   var blob = await fetch('https://randomuser.me/api/')
//   var ans = await blob.json()
//   console.log(blob);
// }

// //fetch is async by nature, it may take a long time to get the data but it does not stop your main code 
// //the data you get is in a blob format so you have to do blob.json so it is readable

// a();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Video 2

// Node.js Basics

  //Node is js run time environment, you cant make backend with js.
  //ryan dahl created js backend, he uses chromes v8 engine which is open source to create a backend, but the v8 is made is C++. 
  //He wraps the C++ code in JS code, it creates a server with the C++ modules

  // to simplify, node js is a js run time environment which is js wrapping a v8 engine


//installing node.js and npm

  // npm is a package store
  //to create a node package, do npm init (which will ask details) or npm init -y, creates a package

  // can use different libraries that come with Node.js

  //write file
  // const fs = require('fs');
  // fs.writeFile("hey.txt", "hello kid", (err)=>{
  //   if (err) console.log(err);
  //   else console.log("done")
  // })

  // const fs = require('fs');
  // fs.appendFile("hey.txt", " how are you", (err)=>{
  //   if (err) console.log(err);
  //   else console.log("done")
  // })

  //   const fs = require('fs');
  // fs.rename("hey.txt", " imgood.txt", (err)=>{
  //   if (err) console.log(err);
  //   else console.log("done")
  // })

  //     const fs = require('fs');
  // fs.rename("hey.txt", " imgood.txt", (err)=>{
  //   if (err) console.log(err);
  //   else console.log("done")
  // })

// HTTP/HTTPS

//protocol/ rule which allsows to call and send stuff on the internet
//to use http there is a package called http

//Video 3

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//npm is a place where we can install different packages. Ex: Text to speech


//dev dependencies are only useful in development, not in hosting or building

//Video 4

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Express.js is an npm package
//is a framework not a library

//Framework gives you a flow, have to follow the flow completely

//express js manages everything from receiving the request and giving the response

//Like running a youtube video, when you click a video, you send the request, and thats when express.js comes in play. It then sends back the data you need to play the video

//express example
const express = require ('express')
const app = express()

app.get('/', (req, res)=>{
  res.send("Helloghghjgjhg World")
})

// the first is the route, while the request handles (req, res)=>{} is the middleware

//need to restart in the console everytime you want to see changes unless you downlaod nodemon

app.get('/add', (req, res)=>{
  res.send('Fat monkeying')
})

app.listen(3000)

