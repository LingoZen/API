import hapi from 'hapi';

import {config} from './config';
import {gqlRegistry} from './gql-registry';

const server = new hapi.Server();

console.info(`Environment: ${process.env.NODE_ENV}`);

// Configure the api server
server.connection({
    host: config.server.host,
    port: config.server.portNumber
});

//register apollo with server
server.register(gqlRegistry, (err) => {
    if (err) {
        return console.error(err);
    }

    //start the server
    return server.start(() => {
        console.info(`Started server at ${JSON.stringify(server.info.uri)}`);
    });
});
