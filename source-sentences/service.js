import assert from "assert";

import {config} from "../config";
import {esConnection} from "../es";
import {SourceSentence} from "./db-schema";
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

async function searchSourceSentences({searchString = "", languageId = "eng"}) {
    assert(searchString);
    assert(languageId);

    const searchBody = {
        _source: false,
        query: {
            match: {
                text: searchString
            }
        }
    };

    let index = null;
    switch (languageId) {
        case 'eng':
            index = `${config.es.sourceSentenceIndexPrefix}english`;
            break;
        case 'spa':
            index = `${config.es.sourceSentenceIndexPrefix}spanish`;
            break;
        case 'fra':
            index = `${config.es.sourceSentenceIndexPrefix}french`;
            break;
        default:
            throw new AppError(`Unknown language id ${languageId}`, {code: `NO_INDEX_EXISTS_FOR_LANGUAGE_ID`});
    }

    const results = await esConnection.search({
        index: index,
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
