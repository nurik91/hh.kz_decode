module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'admin',
        host: 'localhost',
        dialect: 'postgres',
    },
    production: {
        username: 'doadmin',
        password: 'AVNS_aTk8r1qBUTEynWq0MT7',
        database: 'defaultdb',
        host: 'private-dbaas-db-9598288-do-user-17849646-0.g.db.ondigitalocean.com',
        dialect: 'postgres',
        port: 25060
    }
}