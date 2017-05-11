import {iocContainer, doBinding} from "./inversify.config";
import {App} from "./app";
import {iocTypes} from "./ioc-types";
import {GqlRegistry} from "./gql/registry";

doBinding();

//create instance of app
const app = new App(iocContainer.get<GqlRegistry>(iocTypes.GqlRegistry));

//initialize app
app.initializeServer()
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
