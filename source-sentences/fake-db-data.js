import Faker from 'faker';
import async from 'async';

import {SourceSentence} from './db-schema'

export function createFakeDate() {
    SourceSentence.sync({force: true}).then(() => {
        let numberOfSourceSentencesToCreate = 5;
        async.times(numberOfSourceSentencesToCreate, (n, next) => {
            let sourceSentence = {
                text: Faker.lorem.sentence(),
                userId: Faker.random.number({min: 1, max: 50, precision: 1})
            };

            SourceSentence.create(sourceSentence)
                .then(() => next())
                .catch((err) => next(err));
        }, (err) => {
            if (err) {
                return console.error(err);
            }

            return console.info(`Created ${numberOfSourceSentencesToCreate} source sentences successfully`);
        });
    }).catch((err) => {
        console.error(err);
    });
}
