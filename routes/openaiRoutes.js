const express = require('express');
const { generateImage } = require('../controllers/openaiController');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const createAccountLimiter = rateLimit({
  windowMs: 1440 * 60 * 1000,
  max: 3,
  message:
    'Too many accounts created from this IP, please try again after a day',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/generateimage', createAccountLimiter, generateImage);

module.exports = router;
