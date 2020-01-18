const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const path = require('path');

/**
 * GET route template
 */
router.get('/jquery', (req, res) => {
  res.sendFile(path.join(__dirname + '/../files/pixelbox.js'));
});


module.exports = router;