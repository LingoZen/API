import async from 'async';

import {Service as LanguageService} from '../languages/service';
import {config} from '../config';
import {esConnection} from '../es';
import {SourceSentence} from './db-schema';

function getSourceSentence(args) {
    return SourceSentence.findOne({where: args});
}

function getSourceSentences(args) {
    return SourceSentence.findAll({where: args});
}

function create(args) {
    return SourceSentence.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return SourceSentence.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getSourceSentence({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getSourceSentence({id: id}).then((sourceSentence) => {
            if (!sourceSentence) {
                return reject(Error(`Source sentence with id ${id} not found`));
            }

            SourceSentence.destroy({where: {id: id}}).then(() => {
                return resolve(sourceSentence);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function searchSourceSentences(args) {
    return new Promise((resolve, reject) => {
        const searchQuery = args && args.searchQuery;

        return getSourceSentences().then((sentences) => resolve(sentences)).catch((err) => reject(err));
    });
}

function destroySourceSentenceInElasticsearch(sourceSentence) {
    return new Promise((resolve, reject) => {
        let language = null;
        let index = null;

        return async.series([
            (next) => {
                return LanguageService.getLanguage({id: sourceSentence.languageId}).then((_language) => {
                    if (!_language) {
                        return next(new Error(`Could not find language with id ${sourceSentence.languageId}`));
                    }

                    language = _language;
                    index = `${config.es.sourceSentenceIndexPrefix}${language.englishName}`;
                    return next();
                }).catch((err) => {
                    return next(err);
                })
            },
            (next) => {
                return esConnection.indices.exists({
                    index: index
                }).then((indexExists) => {
                    if (indexExists) {
                        return next();
                    }

                    return next(new Error(`Index ${index} does not exist`));
                }).catch((err) => {
                    return next(err);
                });
            },
            (next) => {
                return esConnection.delete({
                    index: index,
                    type: config.es.sourceSentenceType,
                    id: sourceSentence.id
                }).then(() => next()).catch((err) => next(err));
            }
        ], (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

function indexSourceSentenceInElasticsearch(sourceSentence) {
    return new Promise((resolve, reject) => {
        let language = null;
        let index = null;

        return async.series([
            (next) => {
                return LanguageService.getLanguage({id: sourceSentence.languageId}).then((_language) => {
                    if (!_language) {
                        return next(new Error(`Could not find language with id ${sourceSentence.languageId}`));
                    }

                    language = _language;
                    index = `${config.es.sourceSentenceIndexPrefix}${language.englishName}`;
                    return next();
                }).catch((err) => {
                    return next(err);
                })
            },
            (next) => {
                return esConnection.indices.exists({
                    index: index
                }).then((indexExists) => {
                    if (indexExists) {
                        return next();
                    }

                    return next(new Error(`Index ${index} does not exist`));
                }).catch((err) => {
                    return next(err);
                });
            },
            (next) => {
                return esConnection.index({
                    index: index,
                    type: config.es.sourceSentenceType,
                    id: sourceSentence.id,
                    body: {
                        text: sourceSentence.text
                    }
                }).then(() => next()).catch((err) => next(err));
            }
        ], (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}

export const Service = {
    indexSourceSentenceInElasticsearch: indexSourceSentenceInElasticsearch,
    destroySourceSentenceInElasticsearch: destroySourceSentenceInElasticsearch,

    searchSourceSentences: searchSourceSentences,

    getSourceSentence: getSourceSentence,
    getSourceSentences: getSourceSentences,

    create: create,
    update: update,
    destroy: destroy
};
