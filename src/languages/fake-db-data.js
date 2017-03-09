import {Language} from "./db-schema";

export const createFakeData = async function () {
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

    await Language.sync({force: false});

    for (let language of languages) {
        await Language.create(language);
    }

    return languages.length;
};
