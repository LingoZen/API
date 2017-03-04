const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const Reaction = require('./gql-type').Type;
const ReactionService = require('./service').Service;

module.exports.mutationFields = {
    createReaction: {
        type: Reaction,
        args: {
            text: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return ReactionService.create(args);
        }
    },
    updateReaction: {
        type: Reaction,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            text: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return ReactionService.update(args);
        }
    },
    destroyReaction: {
        type: Reaction,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, {id}) {
            return ReactionService.destroy(id);
        }
    }
};
