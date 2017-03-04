const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const Comment = require('./gql-type').Type;
const CommentService = require('./service').Service;

module.exports.mutationFields = {
    createComment: {
        type: Comment,
        args: {
            text: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return CommentService.create(args);
        }
    },
    updateComment: {
        type: Comment,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            text: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return CommentService.update(args);
        }
    },
    destroyComment: {
        type: Comment,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, {id}) {
            return CommentService.destroy(id);
        }
    }
};
