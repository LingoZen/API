import {injectable} from "inversify";

@injectable()
export abstract class QueryField {
    protected _queryFields;

    constructor() {
        this.initializeQueryFields();
    }

    get fields() {
        return this._queryFields
    }

    abstract initializeQueryFields();
}
