import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as Reaction} from '../reactions/gql-type'
import {Type as Comment} from '../comments/gql-type'
import {Type as Translation} from '../translations/gql-type'
import {Type as Language} from '../languages/gql-type'
import {Type as User} from '../users/gql-type'

export const Type = new GraphQLObjectType({
    name: 'SourceSentence',
    description: 'Source Sentence',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve(sourceSentence) {
                return sourceSentence.id;
            }
        },
        text: {
            type: GraphQLString,
            resolve(sourceSentence) {
                return sourceSentence.text;
            }
        },
        user: {
            type: User,
            resolve(sourceSentence) {
                return sourceSentence.getUser();
            }
        },
        language: {
            type: Language,
            resolve(sourceSentence) {
                return sourceSentence.getLanguage();
            }
        },
        reactions: {
            type: new GraphQLList(Reaction),
            resolve(sourceSentence) {
                return sourceSentence.getReactions();
            }
        },
        comments: {
            type: new GraphQLList(Comment),
            resolve(sourceSentence) {
                return sourceSentence.getComments();
            }
        },
        translations: {
            type: new GraphQLList(Translation),
            resolve(sourceSentence) {
                return sourceSentence.getTranslations();
            }
        }
    })
});
