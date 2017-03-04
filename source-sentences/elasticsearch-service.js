const LanguageService = require('../languages/service').Service;
const {config} = require('../config');
const {esConnection} = require('../es');


async function destroySourceSentenceInElasticsearch(sourceSentence) {
    const language = await LanguageService.getLanguage({id: sourceSentence.languageId});

    if (!_language) {
        throw new Error(`Could not find language with id ${sourceSentence.languageId}`);
    }

    const index = `${config.es.sourceSentenceIndexPrefix}${language.englishName}`;

    const indexExists = await esConnection.indices.exists({
        index: index
    });

    if (!indexExists) {
        throw new Error(`Index ${index} does not exist`);
    }

    return esConnection.delete({
        index: index,
        type: config.es.sourceSentenceType,
        id: sourceSentence.id
    });
}

async function indexSourceSentenceInElasticsearch(sourceSentence) {
    const language = await LanguageService.getLanguage({id: sourceSentence.languageId});

    if (!language) {
        throw new Error(`Could not find language with id ${sourceSentence.languageId}`);
    }

    const index = `${config.es.sourceSentenceIndexPrefix}${language.englishName}`;

    const indexExists = await esConnection.indices.exists({
        index: index
    });

    if (!indexExists) {
        throw new Error(`Index ${index} does not exist`);
    }

    return esConnection.index({
        index: index,
        type: config.es.sourceSentenceType,
        id: sourceSentence.id,
        body: {
            text: sourceSentence.text
        }
    });
}

module.exports.ElasticsearchService = {
    indexSourceSentenceInElasticsearch: indexSourceSentenceInElasticsearch,
    destroySourceSentenceInElasticsearch: destroySourceSentenceInElasticsearch,
};
