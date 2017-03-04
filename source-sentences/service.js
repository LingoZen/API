const LanguageService = require('../languages/service').Service;
const {config} = require('../config');
const {esConnection} = require('../es');
const {SourceSentence} = require('./db-schema');

async function getSourceSentence(args) {
    return SourceSentence.findOne({where: args});
}

async function getSourceSentences(args) {
    return SourceSentence.findAll({where: args});
}

async function create(args) {
    return SourceSentence.create(args);
}

async function update(args) {
    const id = args.id;
    delete args.id;

    await SourceSentence.update(args, {where: {id: id}, limit: 1});
    return getSourceSentence({id: id});
}

async function destroy(id) {
    const sourceSentence = await getSourceSentence({id: id});
    if (!sourceSentence) {
        throw new Error(`Source sentence with id ${id} not found`);
    }

    await SourceSentence.destroy({where: {id: id}});
    return sourceSentence;
}

async function searchSourceSentences(args) {
    const searchQuery = args && args.searchQuery;
    const searchBody = {
        _source: false,
        query: {
            match: {
                text: searchQuery
            }
        }
    };

    const results = await esConnection.search({
        index: `source-sentences-*`,
        body: searchBody
    });

    if (!results || !results.hits) {
        throw new Error(`Did not get results back from elasticsearch`);
    }

    const sentenceResultIds = results.hits.hits.map((hit) => hit._id);
    return getSourceSentences({id: sentenceResultIds})
}

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

module.exports.Service = {
    indexSourceSentenceInElasticsearch: indexSourceSentenceInElasticsearch,
    destroySourceSentenceInElasticsearch: destroySourceSentenceInElasticsearch,

    searchSourceSentences: searchSourceSentences,

    getSourceSentence: getSourceSentence,
    getSourceSentences: getSourceSentences,

    create: create,
    update: update,
    destroy: destroy
};
