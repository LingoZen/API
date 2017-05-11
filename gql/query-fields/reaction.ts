import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import {inject, injectable} from "inversify";

import {ReactionService} from "../../service/reaction";
import {QueryField} from "./query-field";
import {ReactionType} from "../types/reaction";
import {iocTypes} from "../../ioc-types";

@injectable()
export class ReactionQueryField extends QueryField {
    constructor(@inject(iocTypes.ReactionService) private reactionService: ReactionService) {
        super();
    }

    initializeQueryFields() {
        const self = this;
        self._queryFields = {
            reaction: {
                type: ReactionType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return self.reactionService.getOne(args);
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
                    return self.reactionService.getMany(args);
                }
            }
        };
    }
}
