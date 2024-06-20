const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const jwt = require('jsonwebtoken')
let url = require('./url')
const middleware = require('./middleware')
mongoose.connect(url, { dbName: "yourway" })
  .then(()=>{console.log("runed")},
  (err)=>{console.log(err)})


app.post('/login', async (req, res) => {
  
    const { username, password,email } = req.body
    try {
      const checking = await mongoose.connection.db.collection('users').findOne({ username, password,email })
      if (!checking) { res.json({ auth: "Not Found" }) }
      if(checking.password!=password){
        res.json({ auth: "passwordnotmatch" })
      }
      else{
        let payload={
          user:{
            _id:checking._id,
            username:checking.username,
          }
        }
        jwt.sign(payload,"your_way",{expiresIn:300000},(err,token)=>{
          if(err){
            res.json({ auth: "errortoken" })
          }
          else{
            res.json({ auth: "success", token: token })
          }
        })
      }
    }
    catch (err) {
      console.log(err)

    }
  }

)
app.post('/signup',async(req,res)=>{
  
    const {username,password,email}=req.body
    
      const checking= await mongoose.connection.db.collection('users').findOne({ username, password, email})
      if(checking){ res.json({auth: "alreadyuser"})}

      else{
        try{
        const check=await mongoose.connection.db.collection('users').insertOne({ username, password ,email})
        if(check){ res.json({auth: "signedup"})}
        else{res.json({auth:failed})}}
     
      catch (err)
      {console.log(err)}
        }
  
})
app.get('/home',middleware,(req,res)=>{
  res.json({auth:"success",user:req.user})
})
app.listen('1313')
// app.post('/home/post',async(req,res)=>
// {
//   const {post_image,description} = req.body


