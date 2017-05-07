import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {LanguageDbSchema} from "./language";
import {SentenceDbSchema} from "./sentence";
import {TranslationDbSchema} from "./translation";
import {UserDbSchema} from "./user";

@injectable()
export class CommentDbSchema extends DbSchema {
    constructor(private sentenceDbSchema: SentenceDbSchema,
                private translationDbSchema: TranslationDbSchema,
                private userDbSchema: UserDbSchema,
                private languageDbSchema: LanguageDbSchema) {
        super();
        this.initializeSchema();
    }

    getSchemaName(): string {
        return `comment`;
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
        return List.of(this.sentenceDbSchema, this.translationDbSchema, this.userDbSchema, this.languageDbSchema);
    }
}
