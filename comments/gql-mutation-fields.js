import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {Type as Comment} from './gql-type';
import {Service as CommentService} from './service';

export const mutationFields = {
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
