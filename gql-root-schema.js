import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';

import {queryFields as CommentQueryFields} from './comments/gql-query-fields';
import {mutationFields as CommentMutationFields} from './comments/gql-mutation-fields';

import {queryFields as LanguageQueryFields} from './languages/gql-query-fields';
import {mutationFields as LanguageMutationFields} from './languages/gql-mutation-fields';

import {queryFields as ReactionQueryFields} from './reactions/gql-query-fields';
import {mutationFields as ReactionMutationFields} from './reactions/gql-mutation-fields';

import {queryFields as SourceSentenceQueryFields} from './source-sentences/gql-query-fields';
import {mutationFields as SourceSentenceMutationFields} from './source-sentences/gql-mutation-fields';

import {queryFields as TranslationQueryFields} from './translations/gql-query-fields';
import {mutationFields as TranslationMutationFields} from './translations/gql-mutation-fields';

import {queryFields as UserQueryFields} from './users/gql-query-fields';
import {mutationFields as UserMutationFields} from './users/gql-mutation-fields';

export const rootSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: `Query`,
        description: `Root Query`,
        fields: () => {
            return Object.assign(
                {},
                CommentQueryFields,
                LanguageQueryFields,
                ReactionQueryFields,
                SourceSentenceQueryFields,
                TranslationQueryFields,
                UserQueryFields
            );
        }
    }),
    mutation: new GraphQLObjectType({
        name: `Mutation`,
        description: `Root Mutations`,
        fields () {
            return Object.assign(
                {},
                CommentMutationFields,
                LanguageMutationFields,
                ReactionMutationFields,
                SourceSentenceMutationFields,
                TranslationMutationFields,
                UserMutationFields
            );
        }
    })
});
