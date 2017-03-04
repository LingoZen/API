const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const CommentQueryFields = require('./comments/gql-query-fields').queryFields;
const CommentMutationFields = require('./comments/gql-mutation-fields').mutationFields;

const LanguageQueryFields = require('./languages/gql-query-fields').queryFields;
const LanguageMutationFields = require('./languages/gql-mutation-fields').mutationFields;

const ReactionQueryFields = require('./reactions/gql-query-fields').queryFields;
const ReactionMutationFields = require('./reactions/gql-mutation-fields').mutationFields;

const SourceSentenceQueryFields = require('./source-sentences/gql-query-fields').queryFields;
const SourceSentenceMutationFields = require('./source-sentences/gql-mutation-fields').mutationFields;

const TranslationQueryFields = require('./translations/gql-query-fields').queryFields;
const TranslationMutationFields = require('./translations/gql-mutation-fields').mutationFields;

const UserQueryFields = require('./users/gql-query-fields').queryFields;
const UserMutationFields = require('./users/gql-mutation-fields').mutationFields;

module.exports.rootSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: `Query`,
        description: `Root Query`,
        fields: () => {
            return Object.assign(
                {},
                LanguageQueryFields,
                UserQueryFields,
                CommentQueryFields,
                ReactionQueryFields,
                TranslationQueryFields,
                SourceSentenceQueryFields
            );
        }
    }),
    mutation: new GraphQLObjectType({
        name: `Mutation`,
        description: `Root Mutations`,
        fields () {
            return Object.assign(
                {},
                LanguageMutationFields,
                UserMutationFields,
                CommentMutationFields,
                ReactionMutationFields,
                TranslationMutationFields,
                SourceSentenceMutationFields
            );
        }
    })
});
