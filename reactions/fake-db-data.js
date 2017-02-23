import Faker from "faker";
import async from "async";

import {Reaction} from "./db-schema";

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return Reaction.sync({force: false}).then(() => {
            const numberOfReactionsToCreate = options.numberOfReactionsToCreate;
            const numberOfUsersInSystem = options.numberOfUsersInSystem;
            const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;
            const numberOfTranslationsInSystem = options.numberOfTranslationsInSystem;
            const numberOfCommentsInSystem = options.numberOfCommentsInSystem;

            return async.times(numberOfReactionsToCreate, (n, next) => {
                const reaction = {
                    type: (Faker.random.number() % 2) ? 'LIKE' : 'DISLIKE',
                    userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                    sourceSentenceId: Faker.random.number({min: 1, max: numberOfSourceSentencesInSystem, precision: 1}),
                    translationId: Faker.random.number({min: 1, max: numberOfTranslationsInSystem, precision: 1}),
                    commentId: Faker.random.number({min: 1, max: numberOfCommentsInSystem, precision: 1})
                };

                return Reaction.create(reaction)
                    .then(() => next())
                    .catch((err) => next(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(numberOfReactionsToCreate);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}
