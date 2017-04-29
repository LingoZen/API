import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as Comment} from '../comments/gql-type'
import {Type as Reaction} from '../reactions/gql-type'
import {Type as SourceSentence} from '../source-sentences/gql-type'
import {Type as User} from '../users/gql-type'
import {Type as Language} from '../languages/gql-type'

export const Type = new GraphQLObjectType({
    name: 'Translation',
    description: 'Translation',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve(translation) {
                return translation.id;
            }
        },
        text: {
            type: GraphQLString,
            resolve(translation) {
                return translation.text;
            }
        },
        user: {
            type: User,
            resolve(translation) {
                return translation.getUser();
            }
        },
        sourceSentence: {
            type: SourceSentence,
            resolve(translation) {
                return translation.getSourceSentence();
            }
        },
        language: {
            type: Language,
            resolve(translation) {
                return translation.getLanguage();
            }
        },
        comments: {
            type: new GraphQLList(Comment),
            resolve(translation) {
                return translation.getComments();
            }
        },
        reactions: {
            type: new GraphQLList(Reaction),
            resolve(translation) {
                return translation.getReactions();
            }
        }
    })
});
