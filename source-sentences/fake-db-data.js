const Faker = require("faker");

const {SourceSentence} = require("./db-schema");
const LanguageService = require("../languages/service").Service;
const seedSentence = require("./seed-source-sentences.json");

module.exports.createFakeData = async function (options) {
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
                text: sentence,
                userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
                languageId: language.id
            };
        });

        for (let sourceSentence of sourceSentences) {
            await SourceSentence.create(sourceSentence);
        }
    }
};
