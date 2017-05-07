import {injectable} from "inversify";

import {Service} from "./service";
import {ReactionDbSchema} from "../db/schemas/reaction";
import {AppError} from "../app-error";

@injectable()
export class ReactionService extends Service {
    constructor(reactionDbSchema: ReactionDbSchema) {
        super(reactionDbSchema);
    }
}
