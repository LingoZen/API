import {inject, injectable} from "inversify";

import {Service} from "./service";
import {LanguageDbSchema} from "../db/schemas/language";
import {iocTypes} from "../ioc-types";

@injectable()
export class LanguageService extends Service {
    constructor(@inject(iocTypes.LanguageDbSchema) languageDbSchema: LanguageDbSchema) {
        super(languageDbSchema);
    }
}
