import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as SourceSentence} from '../source-sentences/gql-type';
import {Type as Translation} from '../translations/gql-type';
import {Type as Comment} from '../comments/gql-type';
import {Type as Reaction} from '../reactions/gql-type';

export const Type = new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve(user) {
                return user.id;
            }
        },
        name: {
            type: GraphQLString,
            resolve(user) {
                return user.name;
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
        },
        translations: {
            type: new GraphQLList(Translation),
            resolve(user) {
                return user.getTranslations();
            }
        },
        comments: {
            type: new GraphQLList(Comment),
            resolve(user) {
                return user.getComments();
            }
        },
        reactions: {
            type: new GraphQLList(Reaction),
            resolve(user) {
                return user.getReactions();
            }
        }
    })
});
