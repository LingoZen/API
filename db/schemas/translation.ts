import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {inject, injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {UserDbSchema} from "./user";
import {SentenceDbSchema} from "./sentence";
import {LanguageDbSchema} from "./language";
import {iocTypes} from "../../ioc-types";

@injectable()
export class TranslationDbSchema extends DbSchema {
    constructor(@inject(iocTypes.UserDbSchema) private userDbSchema: UserDbSchema,
                @inject(iocTypes.SentenceDbSchema) private sentenceDbSchema: SentenceDbSchema,
                @inject(iocTypes.LanguageDbSchema) private languageDbSchema: LanguageDbSchema) {
        super();
        this.initializeSchema();
    }

    getSchemaName(): string {
        return `translation`;
    }

    getSchemaAttribute(): Map<string, any> {
        return Map({
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        });
    }

    getAdditionalSchemaOptions(): Map<string, any> {
        return Map({});
    }

    getRelationships(): List<DbSchema> {
        return List.of(this.userDbSchema, this.sentenceDbSchema, this.languageDbSchema);
    }
}
