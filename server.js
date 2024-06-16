const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
let url = require('./url')
mongoose.connect(url, { dbName: "yourway" })
  .then(()=>{console.log("runed")},
  (err)=>{console.log(err)})


app.post('/login', async (req, res) => {
  
    const { username, password } = req.body
    try {
      const checking = mongoose.connection.db.collection('users').findOne({ username, password })
      if (checking) { res.json({ auth: "success" }) }
      else{res.json({auth:"failed"})}
    }
    catch (err) {
      console.log(err)

    }
  }

)
app.post('/signup',async(req,res)=>{
  
    const {username,password,email}=req.body
    
      const checking= await mongoose.connection.db.collection('users').findOne({ username, password, email})
      if(checking){ res.json({auth: "logged"})}

      else{
        try{
        const check=await mongoose.connection.db.collection('users').insertOne({ username, password ,email})
        if(check){ res.json({auth: "signedup"})}
        else{res.json({auth:failed})}}
     
      catch (err)
      {console.log(err)}
        }
  
})
app.listen('1313')
// app.post('/home/post',async(req,res)=>
// {
//   const {post_image,description} = req.body


