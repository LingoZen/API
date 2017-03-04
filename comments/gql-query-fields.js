const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const Comment = require('./gql-type').Type;
const CommentService = require('./service').Service;

module.exports.queryFields = {
    comment: {
        type: Comment,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return CommentService.getComment(args);
        }
    },
    comments: {
        type: new GraphQLList(Comment),
        resolve(_, args) {
            return CommentService.getComments(args);
        }
    }
};
