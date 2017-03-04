const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');

const Reaction = require('../reactions/gql-type').Type;
// const User = require('../users/gql-type').Type;
// const SourceSentence = require('../source-sentences/gql-type').Type;
// const Translation = require('../translations/gql-type').Type;

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
    translationId: {
        type: GraphQLID,
        resolve(translation) {
            return translation.translationId;
        }
    },
    // translation: {
    //     type: Translation,
    //     resolve(translation) {
    //         return translation.getTranslation();
    //     }
    // },
    reactions: {
        type: new GraphQLList(Reaction),
        resolve(reaction) {
            return reaction.getReactions();
        }
    }
});

module.exports.Type = new GraphQLObjectType({
    name: 'Comment',
    description: 'Comment',
    fields: fields
});
