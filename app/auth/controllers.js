const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendEmail = require('../utils/sendMail');
const AuthCode = require('./AuthCode');
const User = require('./User') // нужно чтобы создать user-a
const Role = require('./Role')
const {jwtOptions} = require('./passport')
const Company = require('./Company')



const sendVerificationEmail = async (req, res) => {
    const code = "HH" + Date.now(); // генерация уникального кода

    try {
        await AuthCode.create({
            email: req.body.email,
            code: code,
            valid_till: new Date(Date.now() + 120000) // 2 минуты
        });

        sendEmail(req.body.email, "Код авторизации hh.kz", code);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error saving to database or sending email:', error);
        res.status(500).send('Error sending email: ' + error.message);
    }
};

const verifyCode = async (req, res) => {
    try{
    const authCode = await AuthCode.findOne({
        where: {email: req.body.email},
        order: [['valid_till', 'DESC']],
    })

    // услоавия авторизации для валидности
    if(!authCode){
        res.status(401).send({error: 'email not found'}); 
    } else if(new Date(authCode.valid_till).getTime() < Date.now()) { // перевести дату в формат timestemp-a для сравнения, сейчас стойт в формате sting
        res.status(401).send({error: 'time has already passed'});
    } else if(authCode.code !== req.body.code) { 
        res.status(401).send({error: 'password is incorrect'}); 
    } else {

        // после прохождения валидности создаем пользователя
        let user = await User.findOne({where: {email: req.body.email}})
        const role = await Role.findOne({where: {name: 'employee'}})

        if(!user){
            user = await User.create({
                roleId: role.id,
                email: req.body.email
            })
        }

        // процесс создания токена
        const token = jwt.sign({ 
            id: user.id, 
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            role: {
                id: role.id,
                role: role.name
            }
        }, jwtOptions.secretOrKey,{
            expiresIn: 24 * 60 * 60 * 365
        });
        // отправления токена на фронтенд
        res.status(200).send({token});
    }
    } catch (error) {
        res.status(500).send(error)
    } 
}

const signUp = async(req, res) => {
    try{

    // это функция которое будет создавать пользователя (работодателя)
    // сначало надо нам компанию создать, а потом пользователя. User у нас будет привязан к Company
    // Нам еще нужно User связать с Role-ю
    
    const role = await Role.findOne({
        where: {
            name: "manager"
        }
    })

    const company = await Company.create({
        name: req.body.company_name,
        description: req.body.company_description,
        address: req.body.company_address,
        logo: '/company/' + req.file.filename
        
    })

    // Генерация соли
    const salt = await bcrypt.genSalt(10);

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    await User.create({
        email: req.body.email,
        password: hashedPassword,
        full_name: req.body.full_name,
        companyId: company.id,
        roleId: role.id
    })

    res.status(200).end();

    } catch (error) {
        res.status(500).send(error)
    } 
}


// авторизация работодателя, авторизцаия токенная
const logIn = async(req, res) => {
    try{
    // валидация 
    if(!req.body.email || req.body.email.length === 0 ||
        !req.body.password || req.body.password.length === 0) {
            res.status(401).send({message: "Bad credentials"})
        } else { // если данные пришли, погнали проверять, есть ли такой пользовател в нашем БД

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
        })

        if(!user) return res.status(401).send({message: "User with this email doesn't exist"})
        
        console.log(req.body.password, user.password);
        
        // если user есть - дальше нужно будет проверить пароли
        //                            то что пришло с фронта, пароль в базе
        const isMatch = await bcrypt.compare(req.body.password, user.password ) 

        // если они совпадають, то есть авторизация прошла успешно
        if(isMatch){
        // если пароли совпадають, мы должны сгенерировать токен для работодателя
        const role = await Role.findByPk(user.roleId) // вытаскываем role по roleId
        // процесс создания токена
        const token = jwt.sign({ 
            id: user.id, 
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            role: {
                id: role.id,
                role: role.name
            }
        }, jwtOptions.secretOrKey,{
            expiresIn: 24 * 60 * 60 * 365
        });

        // отправления токена на фронтенд
        res.status(200).send({token});
           
        } else { //  если пароли не совпадають
            res.status(401).send({message: "Password is incorrect"})
        }

    
    }
    } catch (error) {
        res.status(500).send(error)
    } 
}


module.exports = {
    sendVerificationEmail,
    verifyCode,
    signUp,
    logIn
};
