import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from 'graphql';

import {Type as SourceSentence} from '../source-sentences/gql-type';

const fields = () => ({
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
    sourceSentences: {
        type: new GraphQLList(SourceSentence),
        resolve(user) {
            return user.getSourceSentences();
        }
    }
});

export const Type = new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields: fields
});
