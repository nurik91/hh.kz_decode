const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(logger('dev'));
app.use(cors()); // CORS должен быть до маршрутов
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());

// Подключаем маршруты
require('./app/auth/passport');
app.use(require('./app/auth/routes'));
app.use(require('./app/region/routes'));  // Убедитесь, что маршруты подключены после CORS
app.use(require('./app/skills/routes'));
// другие маршруты...

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJudXJsaWJla251cm1haGFub3ZAZ21haWwuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJwaG9uZSI6bnVsbCwicm9sZSI6eyJyb2xlIjoiZW1wbG95ZWUifSwiaWF0IjoxNzI0MDA0MjExLCJleHAiOjE3NTU1NDAyMTF9.V_1gYJCFVQJ_4YJGCKsaMSYlwvM_Mq1kgxHSjyn_IAc







