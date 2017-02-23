import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {Type as Language} from './gql-type';
import {Service as LanguageService} from './service';

export const mutationFields = {
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
