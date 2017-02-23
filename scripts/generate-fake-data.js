import async from 'async';

import {createFakeData as createFakeUserData} from '../users/fake-db-data';
import {createFakeData as createFakeSourceSentenceData} from '../source-sentences/fake-db-data';

const numberOfUsersToCreate = 100;
async.series([
    (next) => {
        //create user data first since most of remaining elements need users
        createFakeUserData(numberOfUsersToCreate).then(() => next()).catch((err) => next(err));
    },
    (next) => {
        createFakeSourceSentenceData(numberOfUsersToCreate).then(() => next()).catch((err) => next(err));
    }
], (err) => {
    if (err) {
        return console.error(err);
    }

    return console.log(`Created fake data`);
});
