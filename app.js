const hapi = require('hapi');

const {esConnection} = require('./es');
const {config} = require('./config');
const {gqlRegistry} = require('./gql-registry');

async function main() {
    //create the api server
    const server = new hapi.Server();

    //configure it
    server.connection({
        host: config.server.host,
        port: config.server.portNumber
    });

    //register the gql registry with it
    await server.register(gqlRegistry);

    //make sure es cluster is up
    await  esConnection.ping({
        requestTimeout: Infinity
    });
    console.info(`Elasticsearch cluster is running`);

    //make sure db is up
    //todo: actually make sure the database is up
    console.info(`Database is hopefully up...`);

    //start the api server
    await server.start();
    console.info(`Started server at ${JSON.stringify(server.info.uri)}`);


    console.info(`Environment: ${process.env.NODE_ENV}`);
}

main().catch((err) => process.exit(err));
