import Faker from "faker";
import async from "async";

import {SourceSentence} from "./db-schema";
import {Service as LanguageService} from "../languages/service";
const seedSentence = require("./seed-sentences.json");

export function createFakeData(options) {
    return new Promise((resolve, reject) => {
        return SourceSentence.sync({force: false}).then(() => {
            const numberOfUsersInSystem = options.numberOfUsersInSystem;

            const languageNames = Object.keys(seedSentence);
            return async.each(languageNames, (languageName, nextLanguage) => {
                return LanguageService.getLanguage({englishName: languageName}).then((language) => {
                    if (!seedSentence[languageName] || !seedSentence[languageName].length) {
                        return nextLanguage(new Error(`Could not get seed sentences for language ${languageName}`));
                    }

                    const sourceSentences = seedSentence[languageName].filter((sentence) => sentence).map((sentence) => {
                        return {
                            text: sentence,
                            userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                            languageId: language.id
                        };
                    });

                    return async.each(sourceSentences, (sourceSentence, nextSentence) => {
                        return SourceSentence.create(sourceSentence).then(() => nextSentence()).catch((err) => nextSentence(err));
                    }, (err) => nextLanguage(err));
                }).catch((err) => nextLanguage(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}
