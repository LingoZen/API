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

module.exports.Service = {
    searchSourceSentences: searchSourceSentences,

    getSourceSentence: getSourceSentence,
    getSourceSentences: getSourceSentences,

    create: create,
    update: update,
    destroy: destroy
};
