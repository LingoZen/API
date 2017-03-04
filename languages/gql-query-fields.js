const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const Language = require('./gql-type').Type;
const LanguageService = require('./service').Service;

module.exports.queryFields = {
    language: {
        type: Language,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return LanguageService.getLanguage(args);
        }
    },
    languages: {
        type: new GraphQLList(Language),
        resolve(_, args) {
            return LanguageService.getLanguages(args);
        }
    }
};
