const City = require('./City')
const Country = require('./Country')

const getCountries = async(req, res) => {
    try{
    // где список cities получить
    const cities = await Country.findAll()
    res.status(200).send(cities)
    } catch (error) {
        res.status(500).send(error)
    } 
}

const getCities = async(req, res) => {
    try{
    // где список countries получить
    const countries = await City.findAll()
    res.status(200).send(countries)
    } catch (error) {
        res.status(500).send(error)
    } 
}

module.exports = {
    getCountries,
    getCities
}