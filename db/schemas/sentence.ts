import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {DbConnector} from "../connector";
import {LanguageDbSchema} from "./language";
import {UserDbSchema} from "./user";

@injectable()
export class SentenceDbSchema extends DbSchema {
    constructor(dbConnector: DbConnector,
                private userDbSchema: UserDbSchema,
                private languageDbSchema: LanguageDbSchema) {
        super(dbConnector);
        this.initializeSchema();
    }

    getSchemaName(): string {
        return `sentence`;
    }

    getSchemaAttribute(): Map<string, any> {
        return Map({
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            englishName: {
                type: Sequelize.TEXT,
                allowNull: false
            },
        });
    }

    getAdditionalSchemaOptions(): Map<string, any> {
        return Map({});
    }

    getRelationships(): List<DbSchema> {
        return List.of(this.userDbSchema, this.languageDbSchema);
    }
}
