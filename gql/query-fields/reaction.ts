import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import {injectable} from "inversify";

import {ReactionService} from "../../service/reaction";
import {QueryField} from "./query-field";
import {ReactionType} from "../types/reaction";

@injectable()
export class ReactionQueryField extends QueryField {
    constructor(private reactionService: ReactionService) {
        super();
    }

    initializeQueryFields() {
        this._queryFields = {
            reaction: {
                type: ReactionType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return this.reactionService.getOne(args);
                }
            },
            reactions: {
                type: new GraphQLList(ReactionType.type),
                args: {
                    type: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.reactionService.getMany(args);
                }
            }
        };
    }
}
