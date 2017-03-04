const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');

const Comment = require('../comments/gql-type').Type;
const Reaction = require('../reactions/gql-type').Type;
// const SourceSentence = require('../source-sentences/gql-type').Type;
// const User = require('../users/gql-type').Type;
// const Language = require('../languages/gql-type').Type;

const fields = () => ({
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
    userId: {
        type: GraphQLID,
        resolve(translation) {
            return translation.userId;
        }
    },
    // user: {
    //     type: User,
    //     resolve(translation) {
    //         return translation.getUser();
    //     }
    // },
    sourceSentenceId: {
        type: GraphQLID,
        resolve(translation) {
            return translation.sourceSentenceId;
        }
    },
    // sourceSentence: {
    //     type: SourceSentence,
    //     resolve(translation) {
    //         return translation.getSourceSentence();
    //     }
    // },
    languageId: {
        type: GraphQLID,
        resolve(translation) {
            return translation.languageId;
        }
    },
    // language: {
    //     type: Language,
    //     resolve(translation) {
    //         return translation.getLanguage();
    //     }
    // },
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
});

module.exports.Type = new GraphQLObjectType({
    name: 'Translation',
    description: 'Translation',
    fields: fields
});
