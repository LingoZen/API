import {injectable} from "inversify";

/**
 * LingoZen API App Error
 *
 * Takes in the error message and error options which are added to the error object.
 * This allows us to throw an error when they occur rather then storing an error object, modifying it, then throwing it.
 */
export class AppError extends Error {
    code: string;
    status: string | number;

    constructor(message, {code = "", status = null}) {
        super(message);

        this.name = `AppError`;
        this.stack = new Error().stack;

        this.code = code;
        this.status = status;
    }
}
