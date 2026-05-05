import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

if (typeof global.crypto === 'undefined') {
  global.crypto = crypto;
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend Server is Running! 🚀');
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tracker';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const userProgressSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  topics: { type: Array, required: true }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

app.get('/api/progress/:email', async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ email: req.params.email });
    if (progress) {
      res.json(progress);
    } else {
      res.status(404).json({ message: 'Progress not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/progress', async (req, res) => {
  const { email, topics } = req.body;
  try {
    let progress = await UserProgress.findOne({ email });
    if (progress) {
      progress.topics = topics;
      await progress.save();
    } else {
      progress = new UserProgress({ email, topics });
      await progress.save();
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
