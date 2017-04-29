import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {Type as Reaction} from './gql-type'
import {Service as ReactionService} from './service'

export const mutationFields = {
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
