import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";

import {Type} from "./type";
import {TranslationType} from "./translation";
import {LanguageType} from "./language";
import {ReactionType} from "./reaction";
import {UserType} from "./user";
import {CommentType} from "./comment";

export class SentenceType extends Type {
    type = new GraphQLObjectType({
        name: 'SourceSentence',
        description: 'Source Sentence',
        fields: () => ({
            id: {
                type: GraphQLID,
                resolve(sourceSentence) {
                    return sourceSentence.id;
                }
            },
            text: {
                type: GraphQLString,
                resolve(sourceSentence) {
                    return sourceSentence.text;
                }
            },
            user: {
                type: UserType.type,
                resolve(sourceSentence) {
                    return sourceSentence.getUser();
                }
            },
            language: {
                type: LanguageType.type,
                resolve(sourceSentence) {
                    return sourceSentence.getLanguage();
                }
            },
            reactions: {
                type: new GraphQLList(ReactionType.type),
                resolve(sourceSentence) {
                    return sourceSentence.getReactions();
                }
            },
            comments: {
                type: new GraphQLList(CommentType.type),
                resolve(sourceSentence) {
                    return sourceSentence.getComments();
                }
            },
            translations: {
                type: new GraphQLList(TranslationType.type),
                resolve(sourceSentence) {
                    return sourceSentence.getTranslations();
                }
            }
        })
    });

    constructor() {
        super();
    }
}
