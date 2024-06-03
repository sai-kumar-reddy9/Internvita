const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event_registration')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Schema and Model
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

// Define Routes
app.post('/register', async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
