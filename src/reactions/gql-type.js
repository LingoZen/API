import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from 'graphql';

import {Type as User} from '../users/gql-type'
import {Type as SourceSentence} from '../source-sentences/gql-type'
import {Type as Comment} from '../comments/gql-type'
import {Type as Translation} from '../translations/gql-type'

export const Type = new GraphQLObjectType({
    name: 'Reaction',
    description: 'Reaction',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve(reaction) {
                return reaction.id;
            }
        },
        type: {
            type: GraphQLString,
            resolve(reaction) {
                return reaction.type;
            }
        },
        user: {
            type: User,
            resolve(reaction) {
                return reaction.getUser();
            }
        },
        sourceSentence: {
            type: SourceSentence,
            resolve(reaction) {
                return reaction.getSourceSentence();
            }
        },
        translation: {
            type: Translation,
            resolve(reaction) {
                return reaction.getTranslation();
            }
        },
        comment: {
            type: Comment,
            resolve(reaction) {
                return reaction.getComment();
            }
        }
    })
});
