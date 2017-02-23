import Faker from "faker";
import async from "async";

import {Comment} from "./db-schema";

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return Comment.sync({force: false}).then(() => {
            const numberOfCommentsToCreate = options.numberOfCommentsToCreate;
            const numberOfTranslationsInSystem = options.numberOfTranslationsToCreate;
            const numberOfUsersInSystem = options.numberOfUsersInSystem;
            const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;

            return async.times(numberOfCommentsToCreate, (n, next) => {
                const comment = {
                    text: Faker.lorem.sentence(),
                    userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                    sourceSentenceId: Faker.random.number({min: 1, max: numberOfSourceSentencesInSystem, precision: 1}),
                    translationId: Faker.random.number({min: 1, max: numberOfTranslationsInSystem, precision: 1})
                };

                return Comment.create(comment)
                    .then(() => next())
                    .catch((err) => next(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(numberOfTranslationsInSystem);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}
