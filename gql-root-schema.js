import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';

import {queryFields as UserQueryFields} from './users/gql-query-fields';
import {mutationFields as UserMutationFields} from './users/gql-mutation-fields';
import {queryFields as SourceSentenceQueryFields} from './source-sentences/gql-query-fields';
import {mutationFields as SourceSentenceMutationFields} from './source-sentences/gql-mutation-fields';

export const rootSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: `Query`,
        description: `User Query`,
        fields: () => {
            return Object.assign(
                {},
                UserQueryFields,
                SourceSentenceQueryFields
            );
        }
    }),
    mutation: new GraphQLObjectType({
        name: `Mutation`,
        description: `User Mutations`,
        fields () {
            return Object.assign(
                {},
                UserMutationFields,
                SourceSentenceMutationFields
            );
        }
    })
});
