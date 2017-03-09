import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {Type as SourceSentence} from '../source-sentences/gql-type'
import {Type as Translation} from '../translations/gql-type'

export const Type = new GraphQLObjectType({
    name: 'Language',
    description: 'Language',
    fields: () => ({
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
        sourceSentences: {
            type: new GraphQLList(SourceSentence),
            resolve(language) {
                return language.getSourceSentences();
            }
        },
        translations: {
            type: new GraphQLList(Translation),
            resolve(language) {
                return language.getTranslations();
            }
        }
    })
});
