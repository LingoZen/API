import {List, Map} from "immutable";
import {injectable} from "inversify";

import {DbConnector} from "../connector";

@injectable()
export abstract class DbSchema {
    public schema;

    constructor(private dbConnector: DbConnector) {
    }

    protected initializeSchema() {
        this.defineDbSchema();
        this.defineRelationships()
    }

    abstract getSchemaName(): string;

    abstract getSchemaAttribute(): Map<string, any>;

    abstract getAdditionalSchemaOptions(): Map<string, any>;

    abstract getRelationships(): List<DbSchema>;

    /**
     * Defines a schema definition and sets this.schema to it
     */
    private defineDbSchema(): void {
        //default schema options: store timestamp on create/update; set deleted to true when deleting instead of actually deleting
        const defaultSchemaOptions = Map({timestamp: true, paranoid: true});
        const schemaOptions = defaultSchemaOptions.merge(this.getAdditionalSchemaOptions());

        this.schema = this.dbConnector.connection.define(this.getSchemaName(), this.getSchemaAttribute().toObject(), schemaOptions.toObject());

        console.log('After define', this.schema);
    }

    /**
     * Define any 1-m/m-m relationships this schema has with other schemas
     */
    private defineRelationships() {
        const r = this.getRelationships();
        console.log('r', r);
        r.forEach(dbSchema => {
            console.log('dbSchema', dbSchema);
            if (!dbSchema.schema) {
                throw new Error(`dbSchema.schema is undefined or null`);
            }

            this.schema.belongsTo(dbSchema.schema);
            dbSchema.schema.hasMany(this.schema);
        });
    }
}