import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

import {Type as Comment} from './gql-type'
import {Service as CommentService} from './service'

export const queryFields = {
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
