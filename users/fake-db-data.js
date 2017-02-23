import Faker from 'faker';
import async from 'async';

import {User} from './db-schema'

export function createFakeData(numberOfUsersToCreate) {
    return new Promise((resolve, reject) => {
        return User.sync({force: true}).then(() => {
            return async.times(numberOfUsersToCreate, (n, next) => {
                let user = {
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

