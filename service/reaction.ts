import {inject, injectable} from "inversify";

import {Service} from "./service";
import {ReactionDbSchema} from "../db/schemas/reaction";
import {AppError} from "../app-error";
import {iocTypes} from "../ioc-types";

@injectable()
export class ReactionService extends Service {
    constructor(@inject(iocTypes.ReactionDbSchema) reactionDbSchema: ReactionDbSchema) {
        super(reactionDbSchema);
    }
}
