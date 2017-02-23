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
    text: {
        type: GraphQLString,
        resolve(user) {
            return user.text;
        }
    },
};

export const Type = new GraphQLObjectType({
    name: 'SourceSentence',
    description: 'Source Sentence',
    fields () {
        return fields
    }
});
