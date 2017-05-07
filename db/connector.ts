import * as Sequelize from "sequelize";

import {AppConfig} from "../app-config";

export class DbConnector {
    private static _connection;

    static get connection() {
        if (!DbConnector._connection) {
            DbConnector._connection = DbConnector.createConnection();
        }

        return this._connection;
    }

    private static createConnection() {
        const dbConnectionOptions = {
            dbName: AppConfig.config.db.name,
            dbUsername: AppConfig.config.db.username,
            dbPassword: AppConfig.config.db.password,
            dbHost: AppConfig.config.db.host,
            dbDialect: AppConfig.config.db.dialect,
            dbLogging: AppConfig.config.db.logging
        };

        return new Sequelize(dbConnectionOptions.dbName, dbConnectionOptions.dbUsername, dbConnectionOptions.dbPassword, {
            host: dbConnectionOptions.dbHost,
            dialect: dbConnectionOptions.dbDialect,
            logging: dbConnectionOptions.dbLogging
        })
    }
}
