import {injectable} from "inversify";

@injectable()
export abstract class MutationField {
    protected _mutationFields;

    constructor() {
    }

    get fields() {
        return this._mutationFields
    }

    abstract initializeMutationFields();
}
