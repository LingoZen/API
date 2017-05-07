import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";


import {ReactionType} from "./reaction";
import {SentenceType} from "./sentence";
import {TranslationType} from "./translation";
import {CommentType} from "./comment";

export class UserType {
    static type = new GraphQLObjectType({
        name: 'User',
        description: 'User',
        fields: () => ({
            id: {
                type: GraphQLID,
                resolve(user) {
                    return user.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(user) {
                    return user.name;
                }
            },
            email: {
                type: GraphQLString,
                resolve(user) {
                    return user.email;
                }
            },
            username: {
                type: GraphQLString,
                resolve(user) {
                    return user.username;
                }
            },
            sourceSentences: {
                type: new GraphQLList(SentenceType.type),
                resolve(user) {
                    return user.getSourceSentences();
                }
            },
            translations: {
                type: new GraphQLList(TranslationType.type),
                resolve(user) {
                    return user.getTranslations();
                }
            },
            comments: {
                type: new GraphQLList(CommentType.type),
                resolve(user) {
                    return user.getComments();
                }
            },
            reactions: {
                type: new GraphQLList(ReactionType.type),
                resolve(user) {
                    return user.getReactions();
                }
            }
        })
    });
}
