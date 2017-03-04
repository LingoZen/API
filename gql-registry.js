const {apolloHapi, graphiqlHapi} = require('apollo-server');

const {rootSchema} = require('./gql-root-schema');

const normalEndPoint = {
    register: apolloHapi,
    options: {
        path: '/api/gql',
        apolloOptions: {
            schema: rootSchema,
        },
        route: {
            cors: true
        }
    }
};

const debugEndpoint = {
    register: graphiqlHapi,
    options: {
        path: '/api/giql',
        graphiqlOptions: {
            endpointURL: '/api/gql',
        },
    }
};

const registry = [normalEndPoint];
switch (process.env.NODE_ENV) {
    case 'development':
        registry.push(debugEndpoint);
        break;
    case 'production':
        break;
    default:
        break;
}

module.exports.gqlRegistry = registry;
