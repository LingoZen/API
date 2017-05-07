import Sequelize from "sequelize";
import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbSchema} from "./db-schema";
import {CommentDbSchema} from "./comment";
import {SentenceDbSchema} from "./sentence";
import {TranslationDbSchema} from "./translation";
import {UserDbSchema} from "./user";

@injectable()
export class ReactionDbSchema extends DbSchema {
    constructor(private sentenceDbSchema: SentenceDbSchema,
                private translationDbSchema: TranslationDbSchema,
                private userDbSchema: UserDbSchema,
                private commentDbSchema: CommentDbSchema) {
        super();
        this.initializeSchema();
    }

    getSchemaName(): string {
        return `reaction`;
    }

    getSchemaAttribute(): Map<string, any> {
        return Map({
            type: {
                type: Sequelize.ENUM('LIKE', 'DISLIKE'),
                allowNull: false
            }
        });
    }

    getAdditionalSchemaOptions(): Map<string, any> {
        return Map({});
    }

    getRelationships(): List<DbSchema> {
        return List.of(this.sentenceDbSchema, this.translationDbSchema, this.userDbSchema, this.commentDbSchema);
    }
}
