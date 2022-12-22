const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const API = process.env.API;
app.use(express.json());

const Freelance = require ('./models/freelances');
const Employer = require ('./models/employers');
const Posts = require('./models/Post');

mongoose.connect(API, { useNewUrlParser: true })
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error', err);
});

app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Register freelances
app.post('/regisFreelances', async (req, res) => {
  try{
    const payload = req.body;

    const existsFL = await Freelance.findOne({name: payload.name});
    if(existsFL) {
      res.json({ status: 'error', message: 'username is exists' });
      return;
    }

    payload.password = md5(payload.password);
    const freelance = new Freelance(payload);
    await freelance.save();
    res.json({ status: 'ok', message: 'freelance created' });
  } catch(error) {
    console.log(error.message);
  }
});
//Register employers
app.post('/regisEmployers', async (req, res) => {
  try{
    const payload = req.body;

    const existsEM = await Employer.findOne({name: payload.name});
    if(existsEM) {
      res.json({ status: 'error', message: 'username is exists' });
      return;
    }
    payload.password = md5(payload.password);
    const employer = new Employer(payload);
    await employer.save();
    res.json({ status: 'ok', message: 'employer created' });
  } catch(error) {
    console.log(error.message);
  }
});

//login
app.post('/loginFL', async(req, res) => {
  const { name, password } = req.body;
  const freelance = await Freelance.findOne({name: name, password: md5(password)});

  if(!!freelance) {
    var token = jwt.sign({
      iss: freelance._id,
      name: freelance.name,
    }, SECRET);
    res.json({status: 'ok', message: 'login success', token});
  } else {
    res.json({status: 'error', message: 'user not found'});
  }
});

app.post('/loginEM', async(req, res) => {
  const { name, password } = req.body;
  const employer = await Employer.findOne({name: name, password: md5(password)});

  if(!!employer) {
    var token = jwt.sign({
      iss: employer._id,
      name: employer.name,
    }, SECRET);
    res.json({status: 'ok', message: 'login success', token});
  } else {
    res.json({status: 'error', message: 'user not found'});
  }
});

//get user profile
app.get('/profileFL/me', async (req, res) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    var iss = jwt.verify(token, SECRET).iss;
    const freelance = await Freelance.findOne({_id: iss});
    res.json({status: 200, freelance});
  } catch(error) {
    res.json({status: 204, message: 'invalid token'});
  }
});

//get all
app.get('/freelances', async (req, res) => {
  const freelances = await Freelance.find({});
  console.log(freelances);
  res.json(freelances);
});
app.get('/employers', async (req, res) => {
  const employers = await Employer.find({});
  console.log(employers);
  res.json(employers);
});

//get user details by id

app.get('/freelances/:id', async (req, res) => {
  const { id } = req.params;
  const freelance = await Freelance.findById(id);
  res.json(freelance);
});

app.get('/employers/:id', async (req, res) => {
  const { id } = req.params;
  const employer = await Employer.findById(id);
  res.json(employer);
});

//Create Post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  const newPosts = new Posts ({
    title,
    content,
  });

  newPosts.save((error) => {
    if (error){
      res.json({status: 500, message: 'error'});
    }else {
      res.json({status: 201, message: newPosts});
    }
  });

});

//Get Post
app.get('/Allposts', (req, res) => {
  Posts.find({}, (error, posts) => {
    if(error){
      res.json({status: 500, message: 'error'});
    }else {
      res.status(200).send(posts)
    }
  });
});

//Put
app.put('/freelances/:id', async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  const freelance = await Freelance.findByIdAndUpdate(id, { $set: payload });
  res.json(freelance);
});
app.put('/employers/:id', async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  const employer = await Employer.findByIdAndUpdate(id, { $set: payload });
  res.json(employer);
});

//Delete

app.delete('/freelances/:id', async (req, res) => {
  const { id } = req.params;

  await Freelance.findByIdAndDelete(id);
  res.status(204).end();
});
app.delete('/employers/:id', async (req, res) => {
  const { id } = req.params;

  await Employer.findByIdAndDelete(id);
  res.status(204).end();
});


app.listen(9000, () => {
  console.log('Application is running on port 9000');
});
