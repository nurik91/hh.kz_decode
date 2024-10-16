const express = require('express'); // -	Чтобы подключит какие-то зависимости используем функцию “require” 
const logger = require('morgan')
const app = express(); // переменная которая использует фреймворк express
const cors = require("cors")
const passport = require('passport');



app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded()) // для сериализации данных формата xml
app.use(express.json()) // для сериализации данных формата json
app.use(express.static(__dirname + "/public")) // чтобы файлы(картинки) были доступны в форнтенде


app.use(passport.initialize());

require('./app/auth/passport')
app.use(require('./app/auth/routes'))
app.use(require('./app/region/routes'))
app.use(require('./app/skills/routes'))
app.use(require('./app/employment-type/routes'))
app.use(require('./app/languages/routes'))
app.use(require('./app/resume/routes'))
app.use(require('./app/specializations/routes'))
app.use(require('./app/vacancy/routes'))
app.use(require('./app/applies/routes'))


app.listen(3001, () => { // функция listen принимает два аргумента, порт и функцию
    console.log("Server is listening on port 3001");
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJudXJsaWJla251cm1haGFub3ZAZ21haWwuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJwaG9uZSI6bnVsbCwicm9sZSI6eyJyb2xlIjoiZW1wbG95ZWUifSwiaWF0IjoxNzI0MDA0MjExLCJleHAiOjE3NTU1NDAyMTF9.V_1gYJCFVQJ_4YJGCKsaMSYlwvM_Mq1kgxHSjyn_IAc







