const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const Language = require('./gql-type').Type;
const LanguageService = require('./service').Service;

module.exports.mutationFields = {
    createLanguage: {
        type: Language,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            englishName: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return LanguageService.create(args);
        }
    },
    updateLanguage: {
        type: Language,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            englishName: {
                type: GraphQLString
            }
        },
        resolve(_, args) {
            return LanguageService.update(args);
        }
    },
    destroyLanguage: {
        type: Language,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, {id}) {
            return LanguageService.destroy(id);
        }
    }
};
