import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import {injectable} from "inversify";

import {MutationField} from "./mutation-field";
import {ReactionService} from "../../service/reaction";
import {ReactionType} from "../types/reaction";

@injectable()
export class ReactionMutationField extends MutationField {
    constructor(private reactionService: ReactionService) {
        super();
    }

    initializeMutationFields() {
        this._mutationFields = {
            createReaction: {
                type: ReactionType.type,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return this.reactionService.create(args);
                }
            },
            updateReaction: {
                type: ReactionType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    text: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.reactionService.update(args);
                }
            },
            destroyReaction: {
                type: ReactionType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, {id}) {
                    return this.reactionService.destroy(id);
                }
            }
        }
    }
}
