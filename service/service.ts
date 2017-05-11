import * as assert from "assert";

import {DbSchema} from "../db/schemas/db-schema";
import {AppError} from "../app-error";
import {injectable} from "inversify";

@injectable()
export abstract class Service {
    constructor(protected dbSchema: DbSchema) {
    }

    /**
     * Gets a single record from the database that matches args
     *
     * Side effects: none
     *
     * @param args
     * @returns {any}
     */
    async getOne(args: any) {
        assert(args);

        return this.dbSchema.schema.findOne({where: args});
    }

    /**
     * Gets all record in the database that matches args
     *
     * Side effects: none
     *
     * @param args
     * @returns {any}
     */
    async getMany(args: any) {
        assert(args);

        return this.dbSchema.schema.findAll({where: args});
    }

    /**
     * Creates a record in the database
     *
     * Side effects:
     * * Create a record in the database
     *
     * @param args
     * @returns {any}
     */
    async create(args: any) {
        assert(args);

        return this.dbSchema.schema.create(args);
    }

    /**
     * Updates a record in the database.
     * The record that is updated is the one with the id specified in args.id. All properties provided in args will be replaced.
     *
     * Side effects:
     * * Changes properties in a record in database
     *
     * @param args
     * @returns {any}
     */
    async update(args: any) {
        assert(args);
        assert(args.id);

        let id = args.id;
        delete args.id;

        await this.dbSchema.schema.update(args, {where: {id: id}, limit: 1});
        return this.getOne({id: id});
    }

    /**
     * Removes a record from the database that matches the supplied id
     *
     * Side effects:
     * * Removes a record from the database
     *
     * @param id
     * @returns {Promise<any>}
     */
    async destroy(id: string): Promise<any> {
        assert(id);

        const record = this.getOne({id: id});
        if (!record) {
            throw new AppError(`Record with id ${id} not found`, {code: `RECORD_NOT_FOUND`});
        }

        await this.dbSchema.schema.destroy({where: {id: id}});
        return record
    }
}
