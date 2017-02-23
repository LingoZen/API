import Sequelize from 'sequelize';

import {config} from './config';

export const dbConnection = new Sequelize(
    config.db.name,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect
    }
);
