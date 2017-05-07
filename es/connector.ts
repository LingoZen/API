import * as elasticsearch from "elasticsearch";
import {injectable} from "inversify";

import {AppConfig} from "../app-config";

//Todo: consider making this a singleton
@injectable()
export class EsConnector {
    private _connection;

    constructor(private appConfig: AppConfig) {
        const config = appConfig.config;

        const esConnectionOptions = {
            esHost: config.host,
            esLog: config.logging
        };

        this._connection = EsConnector.createConnection(esConnectionOptions);
    }

    get connection() {
        return this._connection;
    }

    private static createConnection({esHost, esLog}) {
        return new elasticsearch.Client({
            host: esHost,
            log: esLog
        })
    }
}
