import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

import {Type as User} from './gql-type';
import {Service as UserService} from './service';

export const queryFields = {
    user: {
        type: User,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return UserService.getUser(args);
        }
    },
    users: {
        type: new GraphQLList(User),
        resolve(_, args) {
            return UserService.getUsers(args);
        }
    }
};
