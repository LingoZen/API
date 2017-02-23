import Faker from "faker";
import async from "async";

import {SourceSentence} from "./db-schema";

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return SourceSentence.sync({force: false}).then(() => {
            const numberOfSourceSentencesToCreate = options.numberOfSourceSentencesToCreate;
            const numberOfUsersInSystem = options.numberOfUsersInSystem;
            const numberOfLanguagesInSystem = options.numberOfLanguagesInSystem;

            return async.times(numberOfSourceSentencesToCreate, (n, next) => {
                const sourceSentence = {
                    text: Faker.lorem.sentence(),
                    userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                    languageId: Faker.random.number({min: 1, max: numberOfLanguagesInSystem, precision: 1})
                };

                return SourceSentence.create(sourceSentence)
                    .then(() => next())
                    .catch((err) => next(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(numberOfSourceSentencesToCreate);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}
