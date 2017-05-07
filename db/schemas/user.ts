import * as assert from "assert";
import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {DbConnector} from "../connector";

@injectable()
export class UserDbSchema extends DbSchema {
    constructor(dbConnector: DbConnector) {
        super(dbConnector);
        this.initializeSchema();
    }

    getSchemaName(): string {
        return `user`;
    }

    getSchemaAttribute(): Map<string, any> {
        return Map({
            name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            lastLoginDate: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    }

    getAdditionalSchemaOptions(): Map<string, any> {
        return Map({
            hooks: {
                beforeCreate: UserDbSchema.beforeCreateHookFunction,
                beforeUpdate: UserDbSchema.beforeUpdateHookFunction
            }
        });
    }

    getRelationships(): List<DbSchema> {
        return List<DbSchema>();
    }

    private static async beforeCreateHookFunction(user) {
        assert(user);

        //todo encrypt password

        return user;
    }

    private static async beforeUpdateHookFunction(user) {
        assert(user);

        //todo encrypt password

        return user;
    }
}
