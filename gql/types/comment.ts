import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";

import {Type} from "./type";
import {UserType} from "./user";
import {SentenceType} from "./sentence";
import {TranslationType} from "./translation";
import {LanguageType} from "./language";
import {ReactionType} from "./reaction";

export class CommentType extends Type {
    type = new GraphQLObjectType({
        name: 'Comment',
        description: 'Comment',
        fields: () => ({
            id: {
                type: GraphQLID,
                resolve(comment) {
                    return comment.id;
                }
            },
            text: {
                type: GraphQLString,
                resolve(comment) {
                    return comment.text;
                }
            },
            user: {
                type: UserType.type,
                resolve(comment) {
                    return comment.getUser();
                }
            },
            sourceSentence: {
                type: SentenceType.type,
                resolve(comment) {
                    return comment.getSourceSentence();
                }
            },
            translation: {
                type: TranslationType.type,
                resolve(comment) {
                    return comment.getTranslation();
                }
            },
            language: {
                type: LanguageType.type,
                resolve(comment) {
                    return comment.getLanguage();
                }
            },
            reactions: {
                type: new GraphQLList(ReactionType.type),
                resolve(comment) {
                    return comment.getReactions();
                }
            }
        })
    });

    constructor() {
        super();
    }
}