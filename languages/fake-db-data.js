const {Language} = require("./db-schema");

module.exports.createFakeData = async function () {
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
