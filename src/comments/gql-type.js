import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as Reaction} from '../reactions/gql-type'
import {Type as User} from '../users/gql-type'
import {Type as SourceSentence} from '../source-sentences/gql-type'
import {Type as Translation} from '../translations/gql-type'

export const Type = new GraphQLObjectType({
    name: 'Comment',
    description: 'Comment',
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
        translation: {
            type: Translation,
            resolve(translation) {
                return translation.getTranslation();
            }
        },
        reactions: {
            type: new GraphQLList(Reaction),
            resolve(reaction) {
                return reaction.getReactions();
            }
        }
    })
});
