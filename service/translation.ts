import {inject, injectable} from "inversify";

import {Service} from "./service";
import {TranslationDbSchema} from "../db/schemas/translation";
import {AppError} from "../app-error";
import {iocTypes} from "../ioc-types";

@injectable()
export class TranslationService extends Service {
    constructor(@inject(iocTypes.TranslationDbSchema) translationDbSchema: TranslationDbSchema) {
        super(translationDbSchema);
    }
}
