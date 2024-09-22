const express = require('express');
const router = express.Router();
const { getSpecializations } = require('./controllers');

// будет принимать email и отправлять код на email
router.get('/api/specializations', getSpecializations);

module.exports = router;
