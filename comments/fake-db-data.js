import Faker from "faker";
import async from "async";

import {Comment} from "./db-schema";

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return Comment.sync({force: false}).then(() => {
            const numberOfCommentsToCreate = options.numberOfCommentsToCreate;
            const numberOfTranslationsInSystem = options.numberOfTranslationsInSystem;
            const numberOfUsersInSystem = options.numberOfUsersInSystem;
            const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;

            return async.times(numberOfCommentsToCreate, (n, next) => {
                let comment = {
                    text: Faker.lorem.sentence(),
                    userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1})
                };

                switch (parseInt(Math.random() * 100) % 2) {
                    case 0:
                        comment.sourceSentenceId = Faker.random.number({
                            min: 1,
                            max: numberOfSourceSentencesInSystem,
                            precision: 1
                        });
                        break;
                    case 1:
                        comment.translationId = Faker.random.number({
                            min: 1,
                            max: numberOfTranslationsInSystem,
                            precision: 1
                        });
                        break;
                }

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
