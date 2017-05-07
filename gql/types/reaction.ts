import {GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";


import {UserType} from "./user";
import {TranslationType} from "./translation";
import {SentenceType} from "./sentence";
import {CommentType} from "./comment";

export class ReactionType {
    static type = new GraphQLObjectType({
        name: 'Reaction',
        description: 'Reaction',
        fields: () => ({
            id: {
                type: GraphQLID,
                resolve(reaction) {
                    return reaction.id;
                }
            },
            type: {
                type: GraphQLString,
                resolve(reaction) {
                    return reaction.type;
                }
            },
            user: {
                type: UserType.type,
                resolve(reaction) {
                    return reaction.getUser();
                }
            },
            sourceSentence: {
                type: SentenceType.type,
                resolve(reaction) {
                    return reaction.getSourceSentence();
                }
            },
            translation: {
                type: TranslationType.type,
                resolve(reaction) {
                    return reaction.getTranslation();
                }
            },
            comment: {
                type: CommentType.type,
                resolve(reaction) {
                    return reaction.getComment();
                }
            }
        })
    });
}
