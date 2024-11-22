const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.options('*', cors()); // Allow preflight requests for all routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionsRoutes');
const accountRoutes = require('./routes/accountRoutes');
const agentRoutes = require('./routes/agentRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/agent', agentRoutes);


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
