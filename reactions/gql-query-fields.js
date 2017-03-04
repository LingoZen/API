const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString
} = require('graphql');

const Reaction = require('./gql-type').Type;
const ReactionService = require('./service').Service;

module.exports.queryFields = {
    reaction: {
        type: Reaction,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return ReactionService.getReaction(args);
        }
    },
    reactions: {
        type: new GraphQLList(Reaction),
        args: {
            type: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return ReactionService.getReactions(args);
        }
    }
};
