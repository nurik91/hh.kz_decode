const Company = require('../auth/Company')
const EmploymentType = require('../employment-type/EmploymentType')
const City = require('../region/City')
const Specialization = require('../specializations/models/Specialization')
const Experience = require('./models/Experience')
const Vacancy = require('./models/Vacancy')
const { Op } = require('sequelize');


const getExperiences = async(req, res) => {
    try{
    
    const exps = await Experience.findAll({})
    res.status(200).send(exps)
    } catch (error) {
        res.status(500).send(error)
    } 
}

const createVacancy = async(req, res) => {
    try{

    const vacancy = await Vacancy.create({
            name: req.body.name,
            specializationId: req.body.specializationId,
            cityId: req.body.cityId,
            description: req.body.description,
            employmentTypeId: req.body.employmentTypeId,
            salary_from: req.body.salary_from,
            salary_to: req.body.salary_to,
            salary_type: req.body.salary_type,
            address: req.body.address,
            experienceId: req.body.experienceId,
            skills: req.body.skills,
            about_company: req.body.about_company,
            userId: req.user.id,
            companyId: req.user.companyId

    })

    res.status(200).send(vacancy) // отправка vacancy на фронт
    } catch (error) {
        res.status(500).send(error)
    } 
    
}

const getMyVacancies = async(req, res) => {
    try{
    const vacancies = await Vacancy.findAll({
        where: {
            companyId: req.user.companyId
        }
    })
    res.status(200).send(vacancies) 
    } catch (error) {
        res.status(500).send(error)
    } 
}

const getVacancy = async(req, res) => {
    try{
    const vacancy = await Vacancy.findByPk(req.params.id, {
        include: [
            {
                model: City,
                as: "city"
            },
            {
                model: EmploymentType,
                as: "employmentType"
            },
            {
                model: Company,
                as: "company"
            },
            {
                model: Experience,
                as: "experience"
            },            
            {
                model: Specialization,
                as: "specialization"
            },
    ]
    })

    if(vacancy){
        res.status(200).send(vacancy)
    } else {
        res.status(404).send({message: "Vacancy with that id is not found"})
    }
    } catch (error) {
        res.status(500).send(error)
    } 
    
}  

const deleteVacancy = async(req, res) => {
    try{
    await Vacancy.destroy({
        where: {
          id: req.params.id, // когда delete к нам будет приходить req.params.id
        },
      });
      res.status(200).end();
    } catch (error) {
        res.status(500).send(error)
    } 
}

const editVacancy = async(req, res) => {
    try{
    await Vacancy.update(
        {
            name: req.body.name,
            specializationId: req.body.specializationId,
            cityId: req.body.cityId,
            description: req.body.description,
            employmentTypeId: req.body.employmentTypeId,
            salary_from: req.body.salary_from,
            salary_to: req.body.salary_to,
            salary_type: req.body.salary_type,
            address: req.body.address,
            experienceId: req.body.experienceId,
            skills: req.body.skills,
            about_company: req.body.about_company,
            userId: req.user.id,
            companyId: req.user.companyId // вот эти данные меняется. Мы будем перезаписывать всю инфо
          },
          {
            where: {
              id: req.body.id,
            },
    })

    res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    } 
}

const searchVacancy = async(req, res) => {
    try{
    console.log(req.query);

    const options = {} // пустой объект это без каких либо условии, получить все вакансии

    const {q, specializationId, cityId, employmentTypeId, salary, salary_type, experienceId} = req.query // чтобы сохранить все в q
    
    if(q) {
        options[Op.or] = [
            { name: { [Op.iLike]: '%${q}%' }},
            { description: { [Op.iLike]: '%${q}%' }},
            { about_company: { [Op.iLike]: '%${q}%' }},
            { skills: { [Op.iLike]: '%${q}%' }},

        ]
    }

    if(specializationId) {
        options.specializationId = specializationId
    }

    if(cityId) {
        options.cityId = cityId
    }

    if(employmentTypeId) {
        options.employmentTypeId = employmentTypeId
    }

    if(experienceId) {
        options.experienceId = experienceId
    }

    if(salary_type) {
        options.salary_type = salary_type
    }

    if(salary) {
        options.salary_from = { [Op.lte] : salary } // lte - little
        options.salary_to = { [Op.gte] : salary } // gte - greater
    }

    // то что будет сохранить результат полученных вакансии
    const vacancies = await Vacancy.findAll({
        where: options
    })

    res.status(200).send(vacancies)
    } catch (error) {
        res.status(500).send(error)
    } 
}

module.exports = {
    getExperiences,
    createVacancy,
    getMyVacancies,
    getVacancy,
    deleteVacancy,
    editVacancy,
    searchVacancy
}