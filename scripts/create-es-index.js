import async from 'async';

import {esConnection} from '../es';
import {config} from '../config';
import {mapping as frenchSourceSentencesMapping} from '../source-sentences/es-mappings/french';
import {mapping as englishSourceSentencesMapping} from '../source-sentences/es-mappings/english';
import {mapping as spanishSourceSentencesMapping} from '../source-sentences/es-mappings/spanish';

const mappings = {
    french: frenchSourceSentencesMapping,
    english: englishSourceSentencesMapping,
    spanish: spanishSourceSentencesMapping
};

let indexExists = {};

async.series([
    (next) => {
        async.each(config.languages, (language, nextLanguage) => {
            esConnection.indices.exists({
                index: `${config.es.sourceSentenceIndexPrefix}${language}`
            }).then((_indexExists) => {
                indexExists[language] = _indexExists;

                return nextLanguage();
            }).catch((err) => nextLanguage(err));
        }, (err) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    },
    (next) => {
        async.each(config.languages, (language, nextLanguage) => {
            if (!indexExists[language]) {
                return nextLanguage();
            }

            esConnection.indices.delete({
                index: `${config.es.sourceSentenceIndexPrefix}${language}`
            }).then(() => nextLanguage()).catch((err) => nextLanguage(err));
        }, (err) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    },
    (next) => {
        async.each(config.languages, (language, nextLanguage) => {
            if (!mappings[language]) {
                return nextLanguage(new Error(`No mapping found for ${language}`));
            }

            esConnection.indices.create({
                index: `${config.es.sourceSentenceIndexPrefix}${language}`,
                body: {
                    mappings: mappings[language]
                }
            }).then(() => nextLanguage()).catch((err) => nextLanguage(err));
        }, (err) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    }
], (err) => {
    if (err) {
        return console.error(err);
    }

    return console.log('Created index successfully');
});
