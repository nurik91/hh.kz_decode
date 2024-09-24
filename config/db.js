const { Sequelize } = require('sequelize');
const dbConf = require('./config')
const fs = require('fs')
const path = require("path")
let sequelize;
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: '159.65.12.168',
//     port: 25060,
//     dialect: 'postgres',
//     dialectOptions: {
//       connectTimeout: 10000 // 10 seconds
//     }
//   });

// console.log(process.env);

if(process.env.NODE_ENV === "production"){
    console.log("here");
    
    sequelize = new Sequelize(dbConf.production.database, dbConf.production.username, dbConf.production.password, {
        host: dbConf.production.host,
        dialect: dbConf.production.dialect,
        port: dbConf.production.port,
        dialectOptions: {
            ssl: {
                // require: true, // this
                // rejectUnauthorized: false, // Add this if needed, but ensure security
                ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt")),
            },
            // connectTimeout: 10000 // 10 seconds
            
        }
    });
    
} else {
    console.log("1111");
    sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
        host: dbConf.development.host,
        dialect: dbConf.development.dialect,
    });

}

// Проверка соединения с базой данных
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been');
    })
    .catch(((error) => {
        console.error('Unable to connect to the database', error);
    }))


module.exports = sequelize;