const express = require('express');
const router = express.Router();
const { getCountries, getCities } = require('./controllers');

// будет принимать email и отправлять код на email
router.get('/api/region/countries', getCountries);
router.get('/api/region/cities', getCities)

module.exports = router;
