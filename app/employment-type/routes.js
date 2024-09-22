const express = require('express');
const router = express.Router();
const { getEmploymentTypes } = require('./controllers');

// будет принимать email и отправлять код на email
router.get('/api/employment-types', getEmploymentTypes);


module.exports = router;
