const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/ProductRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (optional, if you've set them up)
 app.use('/api/auth', authRoutes);
 app.use('/api/products', productRoutes);



// MongoDB Connection
mongoose.connect(`mongodb+srv://prabodaharshani95:praboda@cluster0.srfmhfy.mongodb.net/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

// Check database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

