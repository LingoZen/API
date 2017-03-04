const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const User = require('./gql-type').Type;
const UserService = require('./service').Service;

module.exports.mutationFields = {
    createUser: {
        type: User,
        args: {
            firstName: {
                type: GraphQLString
            },
            lastName: {
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
            firstName: {
                type: GraphQLString
            },
            lastName: {
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
    }
};
