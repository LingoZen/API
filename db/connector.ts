import {injectable} from "inversify";
import * as Sequelize from "sequelize";

import {AppConfig} from "../app-config";

//Todo: consider making this a singleton
@injectable()
export class DbConnector {
    private _connection;

    constructor(private appConfig: AppConfig) {
        const config = appConfig.config;

        const dbConnectionOptions = {
            dbName: config.db.name,
            dbUsername: config.db.username,
            dbPassword: config.db.password,
            dbHost: config.db.host,
            dbDialect: config.db.dialect,
            dbLogging: config.db.logging
        };

        this._connection = DbConnector.createConnection(dbConnectionOptions);
    }

    get connection() {
        return this._connection;
    }

    private static createConnection({dbName, dbUsername, dbPassword, dbHost, dbDialect, dbLogging}) {
        return new Sequelize(dbName, dbUsername, dbPassword, {
            host: dbHost,
            dialect: dbDialect,
            logging: dbLogging
        })
    }
}
