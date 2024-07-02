// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const jwtM = require('./middle'); 
// const modd = require("./User");
// const posts = modd.posts;
// const users = modd.users;

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Serve static files from the "uploads" directory
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// let url = require('./url');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// mongoose.connect(url, { dbName: "yourway" })
//   .then(() => { console.log("Connected to MongoDB") })
//   .catch(err => { console.error("MongoDB connection error:", err) });

// const mongoserver = await MongoMemoryServer.create();
// const mongoUri = mongoserver.getUri()
// // Multer configuration for file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads');
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, uniqueSuffix + '-' + file.originalname);
// //   }
// // });
// // const upload = multer({ storage: storage });

// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await users.findOne({ username, password });
//     if (!user) {
//       return res.status(401).json({ auth: "gosignup" });
//     }
//     const payload = {
//       user: {
//         _id: user._id,
//         username: user.username
//       }
//     }
//     jwt.sign(payload, 'jwtsecret', { expiresIn: 3600 }, (err, token) => {
//       if (err) {
//         console.error("JWT signing error:", err);
//         return res.status(500).json({ error: "signing error" });
//       }
//       return res.json({ token });
//     });

//   } catch (err) {
//     console.error("Error in login:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });

// app.get('/home', async (req, res) => {
//   try {
//     const data = await mongoose.connection.db.collection("posts").find().toArray();
//     return res.json(data);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send('Server error');
//   }
// });

// app.post('/signup', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const userExists = await users.findOne({ username });

//     if (userExists) {
//       return res.json({ auth: "logged" });
//     }

//     const newUser = new users({ username, password });
//     await newUser.save();
    
//     res.json({ auth: "signedup" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // app.post('/uploadpost', upload.single('p_img'), async (req, res) => {
// //   const { p_name, p_description } = req.body;
// //   const p_img = req.file.path;

// //   try {
// //     const newPost = new posts({ p_name, p_img, p_description });
// //     await newPost.save();
// //     res.json(newPost); // Respond with the new post data
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });




// app.post('/uploadpost', async(req,res)=>{
//   const body = req.body
//   try{
//     const newPost = new posts(body)
//     await newPost.save()
//     res.json(newPost)
//   }
//   catch(err){
//     console.error(err)
//   }
// })





// app.listen(1313, () => {
//   console.log('Server is running on port 1313');
// });








const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtM = require('./middle'); 
const modd = require("./User");
const posts = modd.posts;
const users = modd.users;

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let url = require('./url');

mongoose.connect(url, { dbName: "yourway" })
  .then(() => { console.log("Connected to MongoDB") })
  .catch(err => { console.error("MongoDB connection error:", err) });

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ auth: "gosignup" });
    }
    const payload = {
      user: {
        _id: user._id,
        username: user.username
      }
    }
    jwt.sign(payload, 'jwtsecret', { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        return res.status(500).json({ error: "signing error" });
      }
      return res.json({ token });
    });

  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get('/home', async (req, res) => {
  try {
    const data = await mongoose.connection.db.collection("posts").find().toArray();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await users.findOne({ username });

    if (userExists) {
      return res.json({ auth: "logged" });
    }

    const newUser = new users({ username, password });
    await newUser.save();
    
    res.json({ auth: "signedup" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/uploadpost', async (req, res) => {
  const { p_name, p_img, p_description } = req.body;
  
  if (!p_name || !p_img || !p_description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPost = new posts({ p_name, p_img, p_description });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/profile' , jwtM ,async(req,res)=>{
  try{
    const userPics = await posts.find({ p_name: req.user.username }).exec();
    res.json(userPics)
  }
  catch(err){
    console.error(err)
  }
})

app.listen(1313, () => {
  console.log('Server is running on port 1313');
});
