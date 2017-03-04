const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString
} = require('graphql');

const Reaction = require('../reactions/gql-type').Type;
const Comment = require('../comments/gql-type').Type;
const Translation = require('../translations/gql-type').Type;
// const Language = require('../languages/gql-type').Type;
// const User = require('../users/gql-type').Type;

const fields = () => ({
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
    userId: {
        type: GraphQLID,
        resolve(sourceSentence) {
            return sourceSentence.userId;
        }
    },
    // user: {
    //     type: User,
    //     resolve(sourceSentence) {
    //         return sourceSentence.getUser();
    //     }
    // },
    languageId: {
        type: GraphQLID,
        resolve(sourceSentence) {
            return sourceSentence.languageId;
        }
    },
    // language: {
    //     type: Language,
    //     resolve(sourceSentence) {
    //         return sourceSentence.getLanguage();
    //     }
    // },
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
});

module.exports.Type = new GraphQLObjectType({
    name: 'SourceSentence',
    description: 'Source Sentence',
    fields: fields
});
