import * as hapi from "hapi";

import {DbConnector} from "./db/connector";
import {AppConfig} from "./app-config";
import {GqlRegistry} from "./gql/registry";
import {EsConnector} from "./es/connector";

export class App {
    private server;

    constructor(private gqlRegistry: GqlRegistry) {
        this.server = new hapi.Server();
    }

    public async initializeServer() {
        this.setServerConnection();
        await this.setGraphQlRegistry();
        await App.pingEsConnection();
        await App.pingDbConnection();

        this.server.start();

        console.info(`Started server at ${JSON.stringify(this.server.info.uri)}`);
        console.info(`Environment: ${process.env.NODE_ENV}`);
    }

    private setServerConnection() {
        this.server.connection({
            host: AppConfig.config.server.host,
            port: AppConfig.config.server.portNumber
        });
    }

    private async setGraphQlRegistry() {
        const endpointsToRegister = this.gqlRegistry.getEndpoints();
        return this.server.register(endpointsToRegister);
    }

    private static async pingEsConnection() {
        return EsConnector.connection.ping({
            requestTimeout: Infinity
        });
    }

    private static async pingDbConnection() {
        return DbConnector.connection.authenticate();
    }

}
