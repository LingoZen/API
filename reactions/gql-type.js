const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql');

// const User = require('../users/gql-type').Type;
// const SourceSentence = require('../source-sentences/gql-type').Type;
// const Comment = require('../comments/gql-type').Type;
// const Translation = require('../translations/gql-type').Type;

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
    // user: {
    //     type: User,
    //     resolve(reaction) {
    //         return reaction.getUser();
    //     }
    // },
    sourceSentenceId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.sourceSentenceId;
        }
    },
    // sourceSentence: {
    //     type: SourceSentence,
    //     resolve(reaction) {
    //         return reaction.getSourceSentence();
    //     }
    // },
    translationId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.translationId;
        }
    },
    // translation: {
    //     type: Translation,
    //     resolve(reaction) {
    //         return reaction.getTranslation();
    //     }
    // },
    commentId: {
        type: GraphQLID,
        resolve(reaction) {
            return reaction.commentId;
        }
    },
    // comment: {
    //     type: Comment,
    //     resolve(reaction) {
    //         return reaction.getComment();
    //     }
    // }
});

module.exports.Type = new GraphQLObjectType({
    name: 'Reaction',
    description: 'Reaction',
    fields: fields
});
