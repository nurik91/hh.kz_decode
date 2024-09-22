const Skill = require('./Skill')
const { Op } = require('sequelize')

const getAllSkills = async(req, res) => {
    try{
    // где список skills получить
    const skills = await Skill.findAll()
    res.status(200).send(skills)
    } catch (error) {
        res.status(500).send(error)
    } 
}

const getSkillsByKey = async(req, res) => {
    try{
    // где список skills получить
    const skiils = await Skill.findAll({
        // для пойсковика на фронтенде
        where: {
            name: {
                [Op.iLike]: `%${req.params.key}%`
            }
        }
    })

    res.status(200).send(skiils)
    } catch (error) {
        res.status(500).send(error)
    } 
}

module.exports = {
    getAllSkills,
    getSkillsByKey
}