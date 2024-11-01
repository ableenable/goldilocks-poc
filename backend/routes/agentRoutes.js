// routes/agentRoutes.js

const express = require('express');
const router = express.Router();
const { handleAgent } = require('../controllers/agentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth.protect, handleAgent);

module.exports = router;
