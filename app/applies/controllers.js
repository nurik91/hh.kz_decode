const {NEW, INVITATION, DECLINED} = require('./utils')
const sendMail = require('../utils/sendMail')
const Vacancy = require('../vacancy/models/Vacancy')
const Resume = require('../resume/models/Resume')
const User = require('../auth/User')
const Apply = require('./Apply')
const Company = require('../auth/Company')
const { Op } = require('sequelize');

const createApply = async(req, res) => {
    try {
        const apply = await Apply.create({
            resumeId: req.body.resumeId,
            vacancyId: req.body.vacancyId,
            status: NEW
        })

        // вытащим информацию с базы
        const resume = await Resume.findByPk(req.body.resumeId)
        const vacancy = await Vacancy.findByPk(req.body.vacancyId)
        const user = await User.findByPk(vacancy.userId)
    
        // можем отправить сам запрос
        // кому мы отправим 
        //       кому      , тема почты                               , что будет написано внутри почты
        sendMail(user.email, `Новый отклик на вакансию ${vacancy.name}`,  
        `
        Имя сойскателя: ${resume.first_name}
        Фамилия сойскателя: ${resume.last_name}
        Номер сойскателя: ${resume.phone}
        `)
        res.status(200).send(apply)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getEmployeeAplies = async(req, res) => {
    try {
    // все резюме нашего пользователя находим
    const resumes = await Resume.findAll({ 
        where: {
            userId: req.user.id
        }
    })

    // массив id-шников данных резюме
    const ids = resumes.map(item => item.id)

    // получить список Applies
    const applies = await Apply.findAll({
        where: {
            resumeId: { [Op.in]: ids}
        },
        include: {
            model: Vacancy,
            as: 'vacancy'
        }
    })

    res.status(200).send(applies)
    } catch(error) {
        res.status(500).send(error)
    }
}

const deleteApply = async(req, res) => {
    try{
    await Apply.destroy({
        where: {
            id: req.params.id // то что пришло с фронта мы это удаляем
        }
    })
    res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const acceptEmployee = async(req, res) => {
    try{
    await Apply.update(
        // какие поля мы будем менять
        {
            status: INVITATION
        },
        // где мы будем менять
        {
            // кто именно, приходит с фронтенда
            where: {
                id: req.body.applyId
            }
    })

    // чтобы узнать кому мы отправляем уведомление
    const apply = await Apply.findByPk(req.body.applyId)
    const vacancy = await Vacancy.findByPk(apply.vacancyId)
    const resume = await Resume.findByPk(apply.resumeId)
    const user = await User.findByPk(resume.userId)
    const company = await Company.findByPk(req.user.companyId)

    sendMail(user.email, `You have been invited for the interview for ${vacancy.name}`, `
       компания: ${company.name}, пригласила вас на вакансию ${vacancy.name}, приходите по адресу ${company.address}
       или свяжитесь с Менеджером ${req.user.full_name}, ${req.user.phone}, ${req.user.email}
        ` )
    console.log("Отправляет на эту почту:", user.email);
    
    res.status(200).end()

    } catch (error) {
        res.status(500).send(error)
    }
}

const declineEmployee = async(req, res) => {
    try{
    await Apply.update(
        // какие поля мы будем менять
        {
            status: DECLINED
        },
        // где мы будем менять
        {
            // кто именно, приходит с фронтенда
            where: {
                id: req.body.applyId
            }
    })

    // чтобы узнать кому мы отправляем уведомление
    const apply = await Apply.findByPk(req.body.applyId)
    const vacancy = await Vacancy.findByPk(apply.vacancyId)
    const resume = await Resume.findByPk(apply.resumeId)
    const user = await User.findByPk(resume.userId)
    const company = await Company.findByPk(req.user.companyId)

    sendMail(user.email, `Отказ на вакансию ${vacancy.name}`, `
        компания: ${company.name}, к сожялению ваша кандиатура неподходит на вакансию ${vacancy.name}
         ` )
    res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const getVacancyApplies = async(req, res) => {
    try{
    // если ничего не будут искать в пойске
    const options = {
        vacancyId: req.params.id
    }

    // если какой нибудь пойск по статусу будет
    if(req.query.status && (req.query.status === NEW || req.query.status === INVITATION || req.query.status === DECLINED)) {
        options.status = req.query.status
    }

    // запрос для получения списка откликов на вакансию
    const applies = await Apply.findAll({
        where: options,
        // информация о резюме вводиться
        include: {
            model: Resume,
            as: 'resume'
        }
    })

    res.status(200).send(applies)

        } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createApply,
    getEmployeeAplies,
    deleteApply,
    acceptEmployee,
    declineEmployee,
    getVacancyApplies
}