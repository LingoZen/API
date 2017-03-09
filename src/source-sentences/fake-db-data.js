import Faker from "faker";
import assert from 'assert';

import {SourceSentence} from "./db-schema";
import {Service as LanguageService} from "../languages/service"
import seedSentence from "./seed-source-sentences.json";

export const createFakeData = async function (options) {
    assert(options);

    const numberOfUsersInSystem = options.numberOfUsersInSystem;
    const languageNames = Object.keys(seedSentence);

    await SourceSentence.sync({force: false});

    for (let languageName of languageNames) {
        if (!seedSentence[languageName] || !seedSentence[languageName].length) {
            throw new Error(`Could not get seed sentences for language ${languageName}`);
        }

        const language = await LanguageService.getLanguage({englishName: languageName});
        if (!language) {
            throw new Error(`Could not get language with english name ${languageName}`);
        }

        const sourceSentences = seedSentence[languageName].filter((sentence) => sentence).map((sentence) => {
            return {
                id: sentence.id,
                text: sentence.text,
                userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                languageId: language.id
            };
        });

        for (let sourceSentence of sourceSentences) {
            await SourceSentence.create(sourceSentence);
        }
    }
};
