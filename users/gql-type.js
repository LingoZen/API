import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from 'graphql';

const fields = {
    id: {
        type: GraphQLID,
        resolve(user) {
            return user.id;
        }
    },
    firstName: {
        type: GraphQLString,
        resolve(user) {
            return user.firstName;
        }
    },
    lastName: {
        type: GraphQLString,
        resolve(user) {
            return user.lastName;
        }
    },
    email: {
        type: GraphQLString,
        resolve(user) {
            return user.email;
        }
    },
    username: {
        type: GraphQLString,
        resolve(user) {
            return user.username;
        }
    },
    password: {
        type: GraphQLString,
        resolve(user) {
            return `Cannot fetch user password`;
        }
    }
};

export const Type = new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields () {
        return fields
    }
});
