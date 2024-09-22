const Apply = require('../applies/Apply');
const Resume = require('./models/Resume')

const validateResume = (req, res, next) => {
    try{

    let errors = {};

    // проверка обязательных полей
    if(!req.body.first_name || req.body.first_name.length === 0){
        errors.first_name = "Поле Имя обязательно"
    }
    if(!req.body.last_name || req.body.last_name.length === 0){
        errors.last_name = "Поле Фамилия обязательно"
    }
    if(!req.body.phone || req.body.phone.length === 0){
        errors.phone = "Поле Номер телефона обязательно"
    }
    if(!req.body.position || req.body.position.length === 0){
        errors.position = "Поле Желаемая должность обязательно"
    }
    if(!req.body.about || req.body.about.length  === 0){
        errors.about  = "Поле Информация о себе обязательно"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors) // на фронтенд выйдут ошибки
    else next() // если никаких ошибок не было то вызавим функцию next()
    } catch (error) {
        res.status(500).send(error)
    } 
}

const isAuthOfResume = async (req, res, next) => {
    try{
    const id = req.params.id || req.body.id // получаем id

    const resume = await Resume.findByPk(id) // получаем этот резюме
    if(!resume) res.status(400).send({message: "Resume with that id doesn't exist"}) // если резюме не существует
    else if(req.user.id === resume.userId) next(); // проверять тот кто удаляет это автор резюме
    else res.status(403).send({message: "Access forbidden"})
    } catch (error) {
        res.status(500).send(error)
    } 
}



module.exports = {
    validateResume,
    isAuthOfResume,
}