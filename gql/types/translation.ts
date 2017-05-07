import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";

import {Type} from "./type";
import {UserType} from "./user";
import {SentenceType} from "./sentence";
import {LanguageType} from "./language";
import {ReactionType} from "./reaction";
import {CommentType} from "./comment";

export class TranslationType extends Type {
    type = new GraphQLObjectType({
        name: 'Translation',
        description: 'Translation',
        fields: () => ({
            id: {
                type: GraphQLID,
                resolve(translation) {
                    return translation.id;
                }
            },
            text: {
                type: GraphQLString,
                resolve(translation) {
                    return translation.text;
                }
            },
            user: {
                type: UserType.type,
                resolve(translation) {
                    return translation.getUser();
                }
            },
            sourceSentence: {
                type: SentenceType.type,
                resolve(translation) {
                    return translation.getSourceSentence();
                }
            },
            language: {
                type: LanguageType.type,
                resolve(translation) {
                    return translation.getLanguage();
                }
            },
            comments: {
                type: new GraphQLList(CommentType.type),
                resolve(translation) {
                    return translation.getComments();
                }
            },
            reactions: {
                type: new GraphQLList(ReactionType.type),
                resolve(translation) {
                    return translation.getReactions();
                }
            }
        })
    });

    constructor() {
        super();
    }
}
