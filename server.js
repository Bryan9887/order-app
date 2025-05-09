const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/commercialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const Order = mongoose.model('Order', {
  name: String,
  email: String,
  product: String,
});

// Handle POST request
app.post('/submit-order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send('Order received!');
  } catch (err) {
    res.status(500).send('Failed to save order.');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
