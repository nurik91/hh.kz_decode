const Apply = require('./Apply')
const Resume = require('../resume/models/Resume')

const validateApply = (req, res, next) => {
    let errors = {};
    
    // проверка обязательных полей
    if(!req.body.resumeId || req.body.resumeId.length === 0){
        errors.resumeId = "Поле Резюме обязательно"
    }
    if(!req.body.vacancyId || req.body.vacancyId.length === 0){
        errors.vacancyId = "Поле Вакансия обязательно"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors) // на фронтенд выйдут ошибки
    else next() // если никаких ошибок не было то вызавим функцию next()
}

const isAuthOfApply = async (req, res, next) => {
    try{
    const id = req.params.id // получаем id

    const apply = await Apply.findByPk(id) // вытаскываем Apply из базы
    if(!apply) {res.status(400).send({message: "Apply with that id doesn't exist"})} // если Apply не существует
    else { // если apply есть
        const resumes = await Resume.findAll({ 
            where: {
                userId: req.user.id // мы получаем список resume данного пользователя
            }
        })

        // массив id-шников данных резюме
        const ids = resumes.map(item => item.id)
        
        // console.log(ids, id, ids.includes(id*1)); // для проверки
        
        if(ids.includes(id*1)){ // id приходить с фронта
            next() // если все норм то перейдет в next()
        } else { // если все плохо
            res.status(403).send({message: "Access forbidden"})
        }

    // выташили id-шники всех резюме, потом проверяем эти id-шники его резюме содержить ли id-шник который пришел с фронта тот который хотять удалить
    }; 

    } catch (error) {
        res.status(500).send(error)
    }
}

const isApplyExist = async(req, res, next) => {
    try{
    // в req.body у нас храниться сейчас поле applyId - по этому поле мы сейчас попробуем выташить сам apply
    const apply = await Apply.findByPk(req.body.applyId)

    if(!apply) {res.status(400).send({message: "apply with that id doesn't exist"})}

    // это будет id-шник вакансии
    req.body.id = apply.vacancyId
    console.log(req.body);
    
    next()

    } catch (error) {
    res.status(500).send(error)
    }

}

module.exports = {
    validateApply,
    isAuthOfApply,
    isApplyExist
}