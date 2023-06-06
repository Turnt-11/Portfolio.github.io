// routes/home.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  // Handle the home page request
  res.render('index'); // Render the 'home' view
});

module.exports = router;


