const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString
} = require('graphql');

const SourceSentence = require('./gql-type').Type;
const SourceSentenceService = require('./service').Service;

module.exports.queryFields = {
    sourceSentence: {
        type: SourceSentence,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return SourceSentenceService.getSourceSentence(args);
        }
    },
    sourceSentences: {
        type: new GraphQLList(SourceSentence),
        resolve(_, args) {
            return SourceSentenceService.getSourceSentences(args);
        }
    },
    searchSourceSentences: {
        type: new GraphQLList(SourceSentence),
        args: {
            searchQuery: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return SourceSentenceService.searchSourceSentences(args);
        }
    }
};
