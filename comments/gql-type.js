import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as Reaction} from '../reactions/gql-type'
import {Type as Language} from '../languages/gql-type'
import {Type as User} from '../users/gql-type'
import {Type as SourceSentence} from '../source-sentences/gql-type'
import {Type as Translation} from '../translations/gql-type'

export const Type = new GraphQLObjectType({
    name: 'Comment',
    description: 'Comment',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve(comment) {
                return comment.id;
            }
        },
        text: {
            type: GraphQLString,
            resolve(comment) {
                return comment.text;
            }
        },
        user: {
            type: User,
            resolve(comment) {
                return comment.getUser();
            }
        },
        sourceSentence: {
            type: SourceSentence,
            resolve(comment) {
                return comment.getSourceSentence();
            }
        },
        translation: {
            type: Translation,
            resolve(comment) {
                return comment.getTranslation();
            }
        },
        language: {
            type: Language,
            resolve(comment) {
                return comment.getLanguage();
            }
        },
        reactions: {
            type: new GraphQLList(Reaction),
            resolve(comment) {
                return comment.getReactions();
            }
        }
    })
});
