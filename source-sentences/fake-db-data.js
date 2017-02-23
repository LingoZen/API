import Faker from "faker";
import async from "async";

import {SourceSentence} from "./db-schema";

export function createFakeData(numberOfUsersInSystem) {
    return new Promise((resolve, reject) => {
        return SourceSentence.sync({force: true}).then(() => {
            const numberOfSourceSentencesToCreate = 5;

            return async.times(numberOfSourceSentencesToCreate, (n, next) => {
                let sourceSentence = {
                    text: Faker.lorem.sentence(),
                    userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1})
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
