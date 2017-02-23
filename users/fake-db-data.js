import Faker from 'faker';
import async from 'async';

import {User} from './db-schema'

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return User.sync({force: false}).then(() => {
            const numberOfUsersToCreate = options.numberOfUsersToCreate;

            return async.times(numberOfUsersToCreate, (n, next) => {
                const user = {
                    firstName: Faker.name.firstName(),
                    lastName: Faker.name.lastName(),
                    email: Faker.internet.email(),
                    username: Faker.internet.userName(),
                    password: Faker.internet.password()
                };

                return User.create(user)
                    .then(() => next())
                    .catch((err) => next(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(numberOfUsersToCreate);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

