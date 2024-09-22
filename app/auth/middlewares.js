const Role = require('./Role')
const User = require('./User')

// это лишняя оказывается у библиотеки passport есть проверка авторизации --- passport.authenticate ('jwt', {session: false})
// // первая проверка - пользователь авторизован или нет
// const isAuth = (req, res) => {
//     if(req.user) next() // если req.user есть то вызывай next() - переменный req.user есть только когда пользователь авторизован
//     else res.status(403).send({message: "Unauthorized"})
// }

// эти middleware будет использованы не только для создание резюме еще для удаления и еще для редакирование
// вторая проверка - пользователь employee или нет
const isEmployee = async(req, res, next) => {
    try{ 
    if(req.user) {
        const role = await Role.findByPk(req.user.roleId)

        if(role.name === 'employee') next() // название пользователя должен быть employee
            else res.status(401).send({message: "Acess denied"}) // если req.user есть то вызывай next() - переменный req.user есть только когда пользователь авторизован и еще roleId есть тольк у пользователя
    }                                                                                        
    else res.status(403).send({message: "Unauthorized"})
    } catch (error) {
        res.status(500).send(error)
    } 
}


// третяя проверка - пользователь manager или нет
const isManager = async(req, res, next) => {
    try{
    if(req.user) {
        const role = await Role.findByPk(req.user.roleId)

        if(role.name === 'manager') next() // название пользователя должен быть employee
            else res.status(401).send({message: "Acess denied"}) // если req.user есть то вызывай next() - переменный req.user есть только когда пользователь авторизован и еще roleId есть тольк у пользователя
    }                                                                                        
    else res.status(403).send({message: "Unauthorized"})
    } catch (error) {
        res.status(500).send(error)
    } 
}

const validateSignUp = async(req, res, next) => {
    try{ 
    // валидация для работодателя
    // Пароль и названия компании обязательные 
    // Остальное описание, адрес, логотип как не обязательные поля будут

    let errors = {}

    if(!req.body.email || req.body.email.length === 0){
        errors.email = "Поле email обязательное"
    }

    if(!req.body.full_name || req.body.full_name.length === 0){
        errors.full_name = "Поля Имя и Фамилия обязательные"
    }

    if(!req.body.company_name || req.body.company_name.length === 0){
        errors.company_name = "Поле Имя компании обязательное"
    }

    if(!req.body.password || req.body.password.length === 0){
        errors.password = "Поле Пароль обязательное"
    }

    if(!req.body.password2 || req.body.password2.length === 0){
        errors.password2 = "Поле Потвердить пароль обязательное"
    }

    if(req.body.password !== req.body.password2){ // валидация подтверждающего пароля
        errors.password2 = "Пароли не совпадают"
    }

    // Проверка что такой пользователь уже существует
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user){
        errors.email = "Пользователь с таким email уже зарегестрирован"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors) // на фронтенд выйдут ошибки
    else next() // если никаких ошибок не было то вызавим функцию next()

    } catch (error) {
        res.status(500).send(error)
    } 

}

module.exports = {
    // isAuth,
    isEmployee,
    isManager,
    validateSignUp
}