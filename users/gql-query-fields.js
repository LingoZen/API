import {
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as User} from './gql-type';
import {Service as UserService} from './service';

export const queryFields = {
    user: {
        type: User,
        args: {
            id: {
                type: GraphQLID
            },
            username: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
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
