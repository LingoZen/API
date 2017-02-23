import async from "async";

import {Language} from "./db-schema";

export function createFakeData() {
    return new Promise((resolve, reject) => {
        return Language.sync({force: false}).then(() => {
            const languages = [
                {
                    name: 'english',
                    englishName: 'english'
                },
                {
                    name: 'español',
                    englishName: 'spanish'
                },
                {
                    name: 'français',
                    englishName: 'french'
                }
            ];

            async.each(languages, (language, next) => {
                return Language.create(language)
                    .then(() => next())
                    .catch((err) => next(err));
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(languages.length);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}
