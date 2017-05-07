import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {DbConnector} from "../connector";

@injectable()
export class LanguageDbSchema extends DbSchema {
    constructor(dbConnector: DbConnector) {
        super(dbConnector);
        this.initializeSchema();
    }

    getSchemaName(): string {
        return `language`;
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
        return List<DbSchema>();
    }
}
