const express = require('express');
const router = express.Router();
const { getExperiences, createVacancy, getMyVacancies, getVacancy, deleteVacancy, editVacancy, searchVacancy } = require('./controllers');
const passport = require('passport');
const {isManager} = require('../auth/middlewares')
const {vaildateVacancy, isAuthorOfVacancy} = require('./middlewares');

// будет принимать email и отправлять код на email
router.get('/api/experiences', getExperiences);
router.post('/api/vacancy', passport.authenticate ('jwt', {session: false}), isManager, vaildateVacancy, createVacancy)
router.get('/api/vacancy', passport.authenticate ('jwt', {session: false}), isManager, getMyVacancies)
router.get('/api/vacancy/search', searchVacancy)
router.get('/api/vacancy/:id', getVacancy)
router.delete('/api/vacancy/:id', passport.authenticate ('jwt', {session: false}), isManager, isAuthorOfVacancy, deleteVacancy)
router.put('/api/vacancy', passport.authenticate ('jwt', {session: false}), isManager, isAuthorOfVacancy, vaildateVacancy, editVacancy)


module.exports = router;
