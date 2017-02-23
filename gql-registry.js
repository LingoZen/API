import {apolloHapi, graphiqlHapi} from 'apollo-server';

import {rootSchema} from './gql-root-schema';

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

const _registry = [normalEndPoint];
console.log(`Env: process.env.NODE_ENV`);
switch (process.env.NODE_ENV) {
    case 'dev':
        _registry.push(debugEndpoint);
        break;
    case 'prod':
        break;
    default:
        break;
}

export const gqlRegistry = _registry;
