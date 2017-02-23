import Faker from "faker";
import async from "async";

import {Translation} from "./db-schema";

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return Translation.sync({force: false}).then(() => {
            const numberOfTranslationsToCreate = options.numberOfTranslationsToCreate;
            const numberOfUsersInSystem = options.numberOfUsersInSystem;
            const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;
            const numberOfLanguagesInSystem = options.numberOfLanguagesInSystem;

            return async.times(numberOfTranslationsToCreate, (n, next) => {
                const translation = {
                    text: Faker.lorem.sentence(),
                    userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                    sourceSentenceId: Faker.random.number({min: 1, max: numberOfSourceSentencesInSystem, precision: 1}),
                    languageId: Faker.random.number({min: 1, max: numberOfLanguagesInSystem, precision: 1})
                };

                return Translation.create(translation)
                    .then(() => next())
                    .catch((err) => next(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(numberOfTranslationsToCreate);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}
