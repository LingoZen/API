import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

import {Type as Translation} from './gql-type';
import {Service as TranslationService} from './service';

export const queryFields = {
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
