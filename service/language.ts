import {injectable} from "inversify";

import {Service} from "./service";
import {LanguageDbSchema} from "../db/schemas/language";

@injectable()
export class LanguageService extends Service {
    constructor(languageDbSchema: LanguageDbSchema) {
        super(languageDbSchema);
    }
}
