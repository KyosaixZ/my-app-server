const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/users');
const Product = require('./models/products');

app.use(express.json())

mongoose.connect('mongodb+srv://admin:1234@cluster0.34tzdtw.mongodb.net/appMobile', { useNewUrlParser: true })
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error', err);
});
// mock data
const users = [{}];
const products = [{}];
//get all
app.get('/users', async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.json(users);
});
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//get one
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

//Post
app.post('/users', async (req, res) => {
  const payload = req.body;
  const user = new User(payload);
  await user.save();
  res.status(201).end();
});

//Put
app.put('/users/:id', async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { $set: payload });
  res.json(user);
});

//Delete
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);
  res.status(204).end();
});

app.listen(9000, () => {
  console.log('Application is running on port 9000');
});
