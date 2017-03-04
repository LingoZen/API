const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const Translation = require('./gql-type').Type;
const TranslationService = require('./service').Service;

module.exports.mutationFields = {
    createTranslation: {
        type: Translation,
        args: {
            text: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return TranslationService.create(args);
        }
    },
    updateTranslation: {
        type: Translation,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            text: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return TranslationService.update(args);
        }
    },
    destroyTranslation: {
        type: Translation,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, {id}) {
            return TranslationService.destroy(id);
        }
    }
};
