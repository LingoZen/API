import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString
} from 'graphql';

import {Type as Reaction} from './gql-type';
import {Service as ReactionService} from './service';

export const queryFields = {
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
