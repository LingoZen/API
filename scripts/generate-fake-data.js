import async from 'async';

import {createFakeData as createFakeLanguageData} from '../languages/fake-db-data';
import {createFakeData as createFakeUserData} from '../users/fake-db-data';
import {createFakeData as createFakeSourceSentenceData} from '../source-sentences/fake-db-data';
import {createFakeData as createFakeTranslationData} from '../translations/fake-db-data';
import {createFakeData as createFakeCommentData} from '../comments/fake-db-data';
import {createFakeData as createFakeReactionData} from '../reactions/fake-db-data';

const numberOfLanguagesInSystem = 3;
const numberOfUsersToCreate = 100;
const numberOfSourceSentencesToCreate = 500;
const numberOfTranslationsToCreate = 700;
const numberOfCommentsToCreate = 1000;
const numberOfReactionsToCreate = 2000;

async.series([
    (next) => {
        createFakeLanguageData().then(() => next()).catch((err) => next(err));
    },
    (next) => {
        //create user data first since most of remaining elements need users
        createFakeUserData({
            numberOfUsersToCreate: numberOfUsersToCreate
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        createFakeSourceSentenceData({
            numberOfSourceSentencesToCreate: numberOfSourceSentencesToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        createFakeTranslationData({
            numberOfTranslationsToCreate: numberOfTranslationsToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfSourceSentencesInSystem: numberOfSourceSentencesToCreate,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        createFakeCommentData({
            numberOfCommentsToCreate: numberOfCommentsToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfTranslationsInSystem: numberOfTranslationsToCreate,
            numberOfSourceSentencesInSystem: numberOfSourceSentencesToCreate,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        //todo: this is not working for some reason, not sure why
        createFakeReactionData({
            numberOfReactionsToCreate: numberOfReactionsToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfCommentsInSystem: numberOfCommentsToCreate,
            numberOfTranslationsInSystem: numberOfTranslationsToCreate,
            numberOfSourceSentencesInSystem: numberOfSourceSentencesToCreate,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    }
], (err) => {
    if (err) {
        return console.error(err);
    }

    return console.log(`Created fake data`);
});
