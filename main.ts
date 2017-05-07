import {App} from "./app";
import {iocContainer} from "./inversify.config";
import {AppConfig} from "./app-config";
import {DbConnector} from "./db/connector";
import {EsConnector} from "./es/connector";
import {GqlRegistry} from "./gql/registry";

//get dependencies
const appConfig = iocContainer.get(AppConfig);
const dbConnector = iocContainer.get(DbConnector);
const esConnector = iocContainer.get(EsConnector);
const gqlRegistry = iocContainer.get(GqlRegistry);

//create instance of app
const app = new App(appConfig, dbConnector, esConnector, gqlRegistry);

//initialize app
app.initializeServer()
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
