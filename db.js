import Sequelize from 'sequelize';

import {config} from './config';

export const dbConnection = new Sequelize(
    config.db.name,
    process.env.LINGOZEN_CONFIG_DB_USERNAME,
    process.env.LINGOZEN_CONFIG_DB_PASSWORD,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: config.db.logging
    }
);
