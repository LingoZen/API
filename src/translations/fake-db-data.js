import Faker from "faker";
import assert from 'assert';

import {Translation} from "./db-schema";

export const createFakeData = async function (options) {
    assert(options);

    const numberOfTranslationsToCreate = options.numberOfTranslationsToCreate;
    const numberOfUsersInSystem = options.numberOfUsersInSystem;
    const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;
    const numberOfLanguagesInSystem = options.numberOfLanguagesInSystem;

    await Translation.sync({force: false});

    for (let _ = 0; _ < numberOfTranslationsToCreate; _++) {
        const translation = {
            text: Faker.lorem.sentence(),
            userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
            sourceSentenceId: Faker.random.number({min: 1, max: numberOfSourceSentencesInSystem, precision: 1}),
            languageId: Faker.random.number({min: 1, max: numberOfLanguagesInSystem, precision: 1})
        };

        await Translation.create(translation);
    }

    return numberOfTranslationsToCreate;
};