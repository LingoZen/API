import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from 'graphql';

import {Type as User} from '../users/gql-type';
import {Type as SourceSentence} from '../source-sentences/gql-type';
import {Type as Comment} from '../comments/gql-type';
import {Type as Translation} from '../translations/gql-type';

const fields = () => ({
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
    userId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.userId;
        }
    },
    user: {
        type: User,
        resolve(reaction) {
            return reaction.getUser();
        }
    },
    sourceSentenceId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.userId;
        }
    },
    sourceSentence: {
        type: SourceSentence,
        resolve(reaction) {
            return reaction.getUser();
        }
    },
    translationId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.userId;
        }
    },
    translation: {
        type: Translation,
        resolve(reaction) {
            return reaction.getUser();
        }
    },
    commentId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.userId;
        }
    },
    comment: {
        type: Comment,
        resolve(reaction) {
            return reaction.getUser();
        }
    }
});

export const Type = new GraphQLObjectType({
    name: 'Reaction',
    description: 'Reaction',
    fields: fields
});
