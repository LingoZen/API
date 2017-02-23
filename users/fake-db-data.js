import Faker from 'faker';
import async from 'async';

import {User} from './db-schema'

export function createFakeDate() {
    User.sync({force: true}).then(() => {
        let numberOfUsersToCreate = 50;
        async.times(numberOfUsersToCreate, (n, next) => {
            let user = {
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                email: Faker.internet.email(),
                username: Faker.internet.userName(),
                password: Faker.internet.password()
            };

            User.create(user)
                .then(() => next())
                .catch((err) => next(err));
        }, (err) => {
            if (err) {
                return console.error(err);
            }

            return console.info(`Created ${numberOfUsersToCreate} users successfully`);
        });
    }).catch((err) => {
        console.error(err);
    });
}

