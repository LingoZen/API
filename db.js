const Sequelize = require('sequelize');

const {config} = require('./config');

module.exports.dbConnection = new Sequelize(
    config.db.name,
    process.env.LINGOZEN_CONFIG_DB_USERNAME,
    process.env.LINGOZEN_CONFIG_DB_PASSWORD,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: config.db.logging
    }
);
