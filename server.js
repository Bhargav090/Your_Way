const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const jwtM = require('./middle'); 
const users = require('./User');

const app = express();

app.use(express.json());
app.use(cors());

let url = require('./url');
mongoose.connect(url, { dbName: "yourway" })
  .then(() => { console.log("Connected to MongoDB") })
  .catch(err => { console.error("MongoDB connection error:", err) });


app.post('/login',async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ auth: "gosignup" });
    }

    const payload = {
      user: {
        _id: user._id
      }
    }

    jwt.sign(payload, 'jwtsecret', { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        return res.status(500).json({ error: "JWT signing error" });
      }
      return res.json({ token });
    });

  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


app.get('/post', jwtM,async (req, res) => {
  try {
    const exist = await users.findById(req.user._id);

    if (!exist) {
      return res.status(400).send('User not found');
    }

    res.json(exist);
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


app.listen(1313, () => {
  console.log('Server is running on port 1313');
});
