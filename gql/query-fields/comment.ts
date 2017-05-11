import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {inject, injectable} from "inversify";
import {CommentService} from "../../service/comment";
import {QueryField} from "./query-field";
import {CommentType} from "../types/comment";
import {iocTypes} from "../../ioc-types";

@injectable()
export class CommentQueryField extends QueryField {
    constructor(@inject(iocTypes.CommentService) private commentService: CommentService) {
        super();
    }

    initializeQueryFields() {
        const self = this;
        self._queryFields = {
            comment: {
                type: CommentType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return self.commentService.getOne(args);
                }
            },
            comments: {
                type: new GraphQLList(CommentType.type),
                resolve(_, args) {
                    return self.commentService.getMany(args);
                }
            }
        };
    }
}
