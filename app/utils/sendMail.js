const nodemailer = require('nodemailer');

// Настройка транспортера для отправки email через Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'suleimenovoljas064@gmail.com', // ваш Gmail аккаунт
        pass: 'nupvcwbnvjzvbcgu' // ваш пароль приложения
    },
    tls: {
        rejectUnauthorized: false // игнорирование ошибок сертификатов (не рекомендуется для продакшн)
    }
});

/**
 * Отправка email
 * @param {string} to - Email получателя
 * @param {string} subject - Тема письма
 * @param {string} text - Текст письма
 */
function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'suleimenovoljas064@gmail.com', // email отправки и авторизации должны совпадать
        to: to,
        subject: subject,
        text: text // может быть html код с версткой
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
module.exports = sendEmail;








