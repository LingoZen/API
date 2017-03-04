const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql');

// const SourceSentence = require('../source-sentences/gql-type').Type;
// const Translation = require('../translations/gql-type').Type;

const fields = () => ({
    id: {
        type: GraphQLID,
        resolve(language) {
            return language.id;
        }
    },
    name: {
        type: GraphQLString,
        resolve(language) {
            return language.name;
        }
    },
    englishName: {
        type: GraphQLString,
        resolve(language) {
            return language.englishName;
        }
    },
    // sourceSentences: {
    //     type: new GraphQLList(SourceSentence),
    //     resolve(language) {
    //         return language.getSourceSentences();
    //     }
    // },
    // translations: {
    //     type: new GraphQLList(Translation),
    //     resolve(language) {
    //         return language.getTranslations();
    //     }
    // }
});

module.exports.Type = new GraphQLObjectType({
    name: 'Language',
    description: 'Language',
    fields: fields
});
