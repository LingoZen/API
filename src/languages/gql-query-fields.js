import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

import {Type as Language} from './gql-type'
import {Service as LanguageService} from './service'

export const queryFields = {
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
