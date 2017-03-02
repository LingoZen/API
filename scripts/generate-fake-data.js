import async from 'async';

import {createFakeData as createFakeLanguageData} from '../languages/fake-db-data';
import {createFakeData as createFakeUserData} from '../users/fake-db-data';
import {createFakeData as createFakeSourceSentenceData} from '../source-sentences/fake-db-data';
import {createFakeData as createFakeTranslationData} from '../translations/fake-db-data';
import {createFakeData as createFakeCommentData} from '../comments/fake-db-data';
import {createFakeData as createFakeReactionData} from '../reactions/fake-db-data';

const numberOfLanguagesInSystem = 3;
const numberOfUsersToCreate = 5;
const numberOfTranslationsToCreate = 20;
const numberOfCommentsToCreate = 20;
const numberOfReactionsToCreate = 20;

let numberOfSourceSentencesInSystem = null;

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
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        //todo: make this be the number of source sentences in the database
        numberOfSourceSentencesInSystem = 100;
        next();
    },
    (next) => {
        createFakeTranslationData({
            numberOfTranslationsToCreate: numberOfTranslationsToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfSourceSentencesInSystem: numberOfSourceSentencesInSystem,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        createFakeCommentData({
            numberOfCommentsToCreate: numberOfCommentsToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfTranslationsInSystem: numberOfTranslationsToCreate,
            numberOfSourceSentencesInSystem: numberOfSourceSentencesInSystem,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        createFakeReactionData({
            numberOfReactionsToCreate: numberOfReactionsToCreate,
            numberOfUsersInSystem: numberOfUsersToCreate,
            numberOfCommentsInSystem: numberOfCommentsToCreate,
            numberOfTranslationsInSystem: numberOfTranslationsToCreate,
            numberOfSourceSentencesInSystem: numberOfSourceSentencesInSystem,
            numberOfLanguagesInSystem: numberOfLanguagesInSystem
        }).then(() => next()).catch((err) => next(err));
    }
], (err) => {
    if (err) {
        console.error(err);
        return process.exit();
    }

    console.log(`Created fake data`);
    return process.exit();
});
