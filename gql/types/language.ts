import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";


import {CommentType} from "./comment";
import {SentenceType} from "./sentence";
import {TranslationType} from "./translation";

export class LanguageType {
    static type = new GraphQLObjectType({
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
                type: new GraphQLList(SentenceType.type),
                resolve(language) {
                    return language.getSourceSentences();
                }
            },
            translations: {
                type: new GraphQLList(TranslationType.type),
                resolve(language) {
                    return language.getTranslations();
                }
            },
            comments: {
                type: new GraphQLList(CommentType.type),
                resolve(language) {
                    return language.getComments();
                }
            }
        })
    });
}

