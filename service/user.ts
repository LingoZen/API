import * as assert from "assert";
import {inject, injectable} from "inversify";

import {Service} from "./service";
import {UserDbSchema} from "../db/schemas/user";
import {AppError} from "../app-error";
import {AppEncrypt} from "../app-encrypt";
import {iocTypes} from "../ioc-types";

@injectable()
export class UserService extends Service {
    constructor(@inject(iocTypes.UserDbSchema) userDbSchema: UserDbSchema,
                @inject(iocTypes.AppEncrypt) private appEncrypt: AppEncrypt) {
        super(userDbSchema);
    }

    /**
     * Registers a new user.
     * This functions does checks on the password and email.
     *
     * Side effects:
     * * Create a record in database
     *
     * @param args
     * @returns {Promise<void>}
     */
    async create(args) {
        assert(args);
        assert(args.username);
        assert(args.password);
        assert(args.email);

        // make sure email is unique
        let existingUser = await this.getOne({email: args.email});
        if (existingUser) {
            throw new AppError(`Email ${args.email} is already used`, {code: `EMAIL_NOT_UNIQUE`});
        }

        // make sure username is unique
        //todo: can we merge this get with above?
        existingUser = await this.getOne({username: args.username});
        if (existingUser) {
            throw new AppError(`Username ${args.username} is already used`, {code: `USERNAME_NOT_UNIQUE`});
        }

        // make sure password is strong enough
        const passwordIsStrong = await this.isPasswordStrong(args.password);
        if (!passwordIsStrong) {
            throw new AppError(`Password is not strong`, {code: `PASSWORD_NOT_SECURE`});
        }

        //validate email format
        const emailFormatIsGood = await this.isEmailFormatIsGood(args.email);
        if (!emailFormatIsGood) {
            throw new AppError(`Email format is bad`, {code: `BAD_EMAIL_FORMAT`});
        }

        // at this point, username and email is unique, and password is strong and encrypted.
        // if we wanted to validate any other properties then we would do that here, but we don't have any validation at the moment

        return super.create(args);
    }

    /**
     * Logs in with a given username and password.
     * This function verifies that the user exists, and that there password matches the supplied.
     *
     * Side effects:
     * * Updates User.lastLoginDate
     *
     * @returns {Promise<void>}
     */
    async login(username, password) {
        assert(username);
        assert(password);

        const user = await this.getOne({username: username});
        if (!user) {
            throw new AppError(`User with username ${username} not found`, {code: `USERNAME_NOT_FOUND`});
        }

        const isPasswordCorrect = await this.appEncrypt.comparePasswords(password, user.password);
        if (!isPasswordCorrect) {
            throw new AppError(`Password does not match`, {code: `INCORRECT_PASSWORD`});
        }
    }

    /**
     * Checks the password against our policies to see if its strong enough.
     * Todo: Find password policies that are secure and not annoying to users
     *
     * @param plaintextPassword
     * @returns {Promise<boolean>}
     */
    private async isPasswordStrong(plaintextPassword): Promise<boolean> {
        return true;
    }

    /**
     * Checks the email format to make sure its proper
     * Todo: Find email regex
     *
     * @param email
     * @returns {Promise<boolean>}
     */
    private async isEmailFormatIsGood(email): Promise<boolean> {
        return true;
    }
}
