import * as elasticsearch from "elasticsearch";

import {AppConfig} from "../app-config";

export class EsConnector {
    private static _connection;

    static get connection() {
        if (!EsConnector._connection) {
            EsConnector._connection = EsConnector.createConnection();
        }

        return this._connection;
    }

    private static createConnection() {
        return new elasticsearch.Client({
            host: AppConfig.config.es.host,
            log: AppConfig.config.es.log
        })
    }
}
