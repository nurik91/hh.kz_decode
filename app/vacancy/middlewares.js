const Vacancy = require('./models/Vacancy')

const vaildateVacancy = (req, res, next) => {
    try{
    let errors = {};

    // проверка обязательных полей
    if(!req.body.name || req.body.name.length === 0){
        errors.name = "Поле название вакансии обязательное"
    }
    if(!req.body.specializationId || typeof(req.body.specializationId) === 'number'){
        errors.specializationId = "Поле Специяализация обязательное"
    }
    if(!req.body.cityId || typeof(req.body.cityId) === 'number'){
        errors.cityId = "Поле Где искать сотрудника обязательно"
    }
    if(!req.body.description || req.body.description.length === 0){
        errors.description = "Поле Расскажите про вакансию обязательное"
    }
    if(!req.body.employmentTypeId || typeof(req.body.employmentTypeId) === 'number'){
        errors.employmentTypeId  = "Поле Тип занятости обязательное"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors) // на фронтенд выйдут ошибки
    else next() // если никаких ошибок не было то вызавим функцию next()
    } catch (error) {
        res.status(500).send(error)
    } 
}

const isAuthorOfVacancy = async(req, res, next) => {
    try{

    const id = req.params.id || req.body.id

    const vacancy = await Vacancy.findByPk(id)

    if(!vacancy) {
        res.status(400).send({message: "Vacancy with that id doesn't exist"})
    }                                                                                                      // deleteVacancy      
    else if(vacancy.userId === req.user.id) { // автор который создал вакансию пытается удалить переводим на controller удаления 
        next()
    } else {
        res.status(403).send({message: "Access forbidden"})
    }
    } catch (error) {
        res.status(500).send(error)
    } 
}

module.exports = {
    vaildateVacancy,
    isAuthorOfVacancy
}