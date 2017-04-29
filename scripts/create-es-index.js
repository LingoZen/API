const {esConnection} = require('../es');
const {config} = require('../config');

const frenchSourceSentencesMapping = require('../source-sentences/es-mappings/french').mapping;
const englishSourceSentencesMapping = require('../source-sentences/es-mappings/english').mapping;
const spanishSourceSentencesMapping = require('../source-sentences/es-mappings/spanish').mapping;

const mappings = {
    french: frenchSourceSentencesMapping,
    english: englishSourceSentencesMapping,
    spanish: spanishSourceSentencesMapping
};

async function getIndexExists(languages, indexPrefix) {
    let indexExists = {};

    for (let language of languages) {
        let index = language;
        if (indexPrefix) {
            index = `${indexPrefix}${language}`
        }

        indexExists[language] = await esConnection.indices.exists({
            index: index
        });
    }

    return indexExists;
}

async function deleteExistingIndices(indexExists, indexPrefix) {
    const languagesWithExistingIndex = Object.keys(indexExists)
        .filter((language) => indexExists[language]);

    for (let language of languagesWithExistingIndex) {
        let index = language;
        if (indexPrefix) {
            index = `${indexPrefix}${language}`
        }

        await esConnection.indices.delete({
            index: index
        });
    }
}

async function createIndexForLanguage(languages, indexPrefix) {
    for (let language of languages) {
        if (!mappings[language]) {
            throw new Error(`No mapping found for ${language}`);
        }

        let index = language;
        if (indexPrefix) {
            index = `${indexPrefix}${language}`
        }

        await esConnection.indices.create({
            index: index,
            body: {
                mappings: mappings[language]
            }
        });
    }
}

async function main() {
    const languages = config.languages;
    const indexPrefix = config.es.sourceSentenceIndexPrefix;

    let indexExists = await getIndexExists(languages, indexPrefix);

    await deleteExistingIndices(indexExists, indexPrefix);
    await createIndexForLanguage(languages, indexPrefix);

    console.info('Created indices');
}

main()
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
