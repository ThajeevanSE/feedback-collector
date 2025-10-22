const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin123@cluster0.tx3i61g.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('feedbacks', feedbackSchema);

// POST: Add new feedback
app.post('/api/feedback', async (req, res) => {
  const { name, message } = req.body;
  const newFeedback = new Feedback({ name, message });
  await newFeedback.save();
  res.json({ success: true });
});

// GET: Retrieve all feedback
app.get('/api/feedback', async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

app.listen(5000, () => console.log('Server running on port 5000'));
