import * as bcrypt from "bcrypt-nodejs";
import {injectable} from "inversify";

@injectable()
export class AppEncrypt {
    constructor() {
    }

    public async comparePasswords(plainTextPassword, encryptedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainTextPassword, encryptedPassword, (err, matched) => {
                if (err) {
                    return reject(err);
                }

                return resolve(matched);
            });
        });
    }

    public async encryptPassword(password) {
        return new Promise((resolve, reject) => {
            const salt = null;
            const progress = null;

            bcrypt.hash(password, salt, progress, (err, encryptedPassword) => {
                if (err) {
                    return reject(err);
                }

                return resolve(encryptedPassword);
            });
        });
    }
}
