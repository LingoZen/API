import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {Type as User} from './gql-type'
import {Service as UserService} from './service'

export const mutationFields = {
    createUser: {
        type: User,
        args: {
            name: {
                type: GraphQLString
            },
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return UserService.create(args);
        }
    },
    updateUser: {
        type: User,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            username: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return UserService.update(args);
        }
    },
    destroyUser: {
        type: User,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, {id}) {
            return UserService.destroy(id);
        }
    },
    login: {
        type: User,
        args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, {username, password}) {
            return UserService.login(username, password);
        }
    },
    register: {
        type: User,
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                type: GraphQLString
            },
            username: {
                type: new GraphQLNonNull(GraphQLString)
            }
        }, resolve(_, args) {
            return UserService.register(args);
        }
    }
};
