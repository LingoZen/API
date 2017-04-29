import {graphiqlHapi, graphqlHapi} from "graphql-server-hapi";
import {formatError} from "apollo-errors";

import {rootSchema} from "./gql-root-schema";

const normalEndPoint = {
    register: graphqlHapi,
    options: {
        path: '/api/gql',
        graphqlOptions: {
            formatError: formatError,
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

switch (process.env.NODE_ENV) {
    case 'development':
        _registry.push(debugEndpoint);
        break;
    case 'production':
        break;
    default:
        break;
}

export const gqlRegistry = _registry;
