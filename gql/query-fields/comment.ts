import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {injectable} from "inversify";
import {CommentService} from "../../service/comment";
import {QueryField} from "./query-field";
import {CommentType} from "../types/comment";

@injectable()
export class CommentQueryField extends QueryField {
    constructor(private commentService: CommentService) {
        super();
    }

    initializeQueryFields() {
        this._queryFields = {
            comment: {
                type: CommentType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return this.commentService.getOne(args);
                }
            },
            comments: {
                type: new GraphQLList(CommentType.type),
                resolve(_, args) {
                    return this.commentService.getMany(args);
                }
            }
        };
    }
}
