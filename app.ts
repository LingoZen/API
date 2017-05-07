import * as hapi from "hapi";

import {DbConnector} from "./db/connector";
import {AppConfig} from "./app-config";
import {EsConnector} from "./es/connector";
import {GqlRegistry} from "./gql/registry";

export class App {
    private server;

    constructor(private appConfig: AppConfig,
                private dbConnector: DbConnector,
                private esConnector: EsConnector,
                private gqlRegistry: GqlRegistry) {
        this.server = new hapi.Server();
    }

    public async initializeServer() {
        this.setServerConnection();
        await this.setGraphQlRegistry();
        await this.pingEsConnection();
        await this.pingDbConnection();

        this.server.start();

        console.info(`Started server at ${JSON.stringify(this.server.info.uri)}`);
        console.info(`Environment: ${process.env.NODE_ENV}`);
    }

    private setServerConnection() {
        this.server.connection({
            host: this.appConfig.config.server.host,
            port: this.appConfig.config.server.portNumber
        });
    }

    private async setGraphQlRegistry() {
        const endpointsToRegister = this.gqlRegistry.getEndpoints();
        await this.server.register(endpointsToRegister);
    }

    private async pingEsConnection() {
        return this.esConnector.connection.ping({
            requestTimeout: Infinity
        });
    }

    private async pingDbConnection() {
        return this.dbConnector.connection.authenticate();
    }

}
