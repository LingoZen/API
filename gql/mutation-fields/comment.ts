import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";

import {MutationField} from "./mutation-field";
import {CommentService} from "../../service/comment";
import {CommentType} from "../types/comment";
import {injectable} from "inversify";

@injectable()
export class CommentMutationField extends MutationField {
    constructor(private commentService: CommentService) {
        super();
    }

    initializeMutationFields() {
        this._mutationFields = {
            createComment: {
                type: CommentType.type,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return this.commentService.create(args);
                }
            },
            updateComment: {
                type: CommentType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    text: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.commentService.update(args);
                }
            },
            destroyComment: {
                type: CommentType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, {id}) {
                    return this.commentService.destroy(id);
                }
            }
        };
    }
}
