const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const Translation = require('./gql-type').Type;
const TranslationService = require('./service').Service;

module.exports.queryFields = {
    translation: {
        type: Translation,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return TranslationService.getTranslation(args);
        }
    },
    translations: {
        type: new GraphQLList(Translation),
        resolve(_, args) {
            return TranslationService.getTranslations(args);
        }
    }
};
