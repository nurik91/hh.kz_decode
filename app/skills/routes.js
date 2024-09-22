const express = require('express');
const router = express.Router();
const { getAllSkills, getSkillsByKey } = require('./controllers');

// будет принимать email и отправлять код на email
router.get('/api/skills', getAllSkills); // редко будет применяться
router.get('/api/skills/:key', getSkillsByKey); // по какому то ключю клгда будет искать skill

module.exports = router;
