import assert from 'assert';

import {config} from '../config';
import {esConnection} from '../es';
import {SourceSentence} from './db-schema';
import {AppError} from "../utils/app-error";

async function getSourceSentence(args) {
    assert(args);

    return SourceSentence.findOne({where: args});
}

async function getSourceSentences(args) {
    assert(args);

    return SourceSentence.findAll({where: args});
}

async function create(args) {
    assert(args);

    return SourceSentence.create(args);
}

async function update(args) {
    assert(args);
    assert(args.id);

    const id = args.id;
    delete args.id;

    await SourceSentence.update(args, {where: {id: id}, limit: 1});
    return getSourceSentence({id: id});
}

async function destroy(id) {
    assert(id);

    const sourceSentence = await getSourceSentence({id: id});
    if (!sourceSentence) {
        throw new AppError(`Source sentence with id ${id} not found`, {code: `SENTENCE_NOT_FOUND`});
    }

    await SourceSentence.destroy({where: {id: id}});
    return sourceSentence;
}

async function searchSourceSentences(args) {
    assert(args);

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
        index: `${config.es.sourceSentenceIndexPrefix}*`,
        body: searchBody
    });

    if (!results || !results.hits) {
        throw new AppError(`Did not get results back from elasticsearch`, {code: `NO_RESULTS`});
    }

    const sentenceResultIds = results.hits.hits.map((hit) => hit._id);
    return getSourceSentences({id: sentenceResultIds})
}

export const Service = {
    searchSourceSentences: searchSourceSentences,

    getSourceSentence: getSourceSentence,
    getSourceSentences: getSourceSentences,

    create: create,
    update: update,
    destroy: destroy
};
