const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const User = require('./gql-type').Type;
const UserService = require('./service').Service;

module.exports.queryFields = {
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
