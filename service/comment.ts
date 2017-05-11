import {inject, injectable} from "inversify";

import {Service} from "./service";
import {CommentDbSchema} from "../db/schemas/comment";
import {iocTypes} from "../ioc-types";

@injectable()
export class CommentService extends Service {
    constructor(@inject(iocTypes.CommentDbSchema) commentDbSchema: CommentDbSchema) {
        super(commentDbSchema);
    }
}
