const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const SourceSentence = require('./gql-type').Type;
const SourceSentenceService = require('./service').Service;

module.exports.mutationFields = {
    createSourceSentence: {
        type: SourceSentence,
        args: {
            text: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return SourceSentenceService.create(args);
        }
    },
    updateSourceSentence: {
        type: SourceSentence,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            text: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return SourceSentenceService.update(args);
        }
    },
    destroySourceSentence: {
        type: SourceSentence,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, {id}) {
            return SourceSentenceService.destroy(id);
        }
    }
};
