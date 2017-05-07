import {App} from "./app";
import {iocContainer} from "./inversify.config";
import {GqlRegistry} from "./gql/registry";

//get dependencies
const gqlRegistry = iocContainer.get(GqlRegistry);

//create instance of app
const app = new App(gqlRegistry);

//initialize app
app.initializeServer()
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
