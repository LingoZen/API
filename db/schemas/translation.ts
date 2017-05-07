import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {DbConnector} from "../connector";
import {UserDbSchema} from "./user";
import {SentenceDbSchema} from "./sentence";
import {LanguageDbSchema} from "./language";

@injectable()
export class TranslationDbSchema extends DbSchema {
    constructor(dbConnector: DbConnector,
                private userDbSchema: UserDbSchema,
                private sentenceDbSchema: SentenceDbSchema,
                private languageDbSchema: LanguageDbSchema) {
        super(dbConnector);
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
