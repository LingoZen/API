import {injectable} from "inversify";

import {Service} from "./service";
import {TranslationDbSchema} from "../db/schemas/translation";
import {AppError} from "../app-error";

@injectable()
export class TranslationService extends Service {
    constructor(translationDbSchema: TranslationDbSchema) {
        super(translationDbSchema);
    }
}
