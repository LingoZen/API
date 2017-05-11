import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {inject, injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {LanguageDbSchema} from "./language";
import {UserDbSchema} from "./user";
import {iocTypes} from "../../ioc-types";

@injectable()
export class SentenceDbSchema extends DbSchema {
    constructor(@inject(iocTypes.UserDbSchema) private userDbSchema: UserDbSchema,
                @inject(iocTypes.LanguageDbSchema) private languageDbSchema: LanguageDbSchema) {
        super();
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
