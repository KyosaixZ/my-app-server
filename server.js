const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/users');
const Freelance = require('./models/freelances');
const Employer = require('./models/employers');

app.use(express.json())

mongoose.connect('mongodb+srv://admin:1234@cluster0.34tzdtw.mongodb.net/appMobile', { useNewUrlParser: true })
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error', err);
});
// mock data
const users = [{}];
//get all
app.get('/users', async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.json(users);
});
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

//get one
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});
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

//Post
app.post('/users', async (req, res) => {
  const payload = req.body;
  const user = new User(payload);
  await user.save();
  res.status(201).end();
});
app.post('/freelances', async (req, res) => {
  const payload = req.body;
  const freelance = new Freelance(payload);
  await freelance.save();
  res.status(201).end();
});
app.post('/employers', async (req, res) => {
  const payload = req.body;
  const employer = new Employer(payload);
  await employer.save();
  res.status(201).end();
});

//Put
app.put('/users/:id', async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { $set: payload });
  res.json(user);
});
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
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);
  res.status(204).end();
});
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
