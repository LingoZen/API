import {injectable} from "inversify";

import {Service} from "./service";
import {CommentDbSchema} from "../db/schemas/comment";

@injectable()
export class CommentService extends Service {
    constructor(commentDbSchema: CommentDbSchema) {
        super(commentDbSchema);
    }
}
