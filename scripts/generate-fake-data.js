const createFakeLanguageData = require('../languages/fake-db-data').createFakeData;
const createFakeUserData = require('../users/fake-db-data').createFakeData;
const createFakeSourceSentenceData = require('../source-sentences/fake-db-data').createFakeData;
const createFakeTranslationData = require('../translations/fake-db-data').createFakeData;
const createFakeCommentData = require('../comments/fake-db-data').createFakeData;
const createFakeReactionData = require('../reactions/fake-db-data').createFakeData;

async function main() {
    const numberOfLanguagesInSystem = 3;
    const numberOfUsersToCreate = 5;
    const numberOfTranslationsToCreate = 20;
    const numberOfCommentsToCreate = 20;
    const numberOfReactionsToCreate = 20;

    let numberOfSourceSentencesInSystem = 100; //todo: should not be hardcoded

    await createFakeLanguageData();

    await createFakeUserData({
        numberOfUsersToCreate: numberOfUsersToCreate
    });
    await createFakeSourceSentenceData({
        numberOfUsersInSystem: numberOfUsersToCreate,
        numberOfLanguagesInSystem: numberOfLanguagesInSystem
    });

    await createFakeTranslationData({
        numberOfTranslationsToCreate: numberOfTranslationsToCreate,
        numberOfUsersInSystem: numberOfUsersToCreate,
        numberOfSourceSentencesInSystem: numberOfSourceSentencesInSystem,
        numberOfLanguagesInSystem: numberOfLanguagesInSystem
    });

    await createFakeCommentData({
        numberOfCommentsToCreate: numberOfCommentsToCreate,
        numberOfUsersInSystem: numberOfUsersToCreate,
        numberOfTranslationsInSystem: numberOfTranslationsToCreate,
        numberOfSourceSentencesInSystem: numberOfSourceSentencesInSystem,
        numberOfLanguagesInSystem: numberOfLanguagesInSystem
    });

    await createFakeReactionData({
        numberOfReactionsToCreate: numberOfReactionsToCreate,
        numberOfUsersInSystem: numberOfUsersToCreate,
        numberOfCommentsInSystem: numberOfCommentsToCreate,
        numberOfTranslationsInSystem: numberOfTranslationsToCreate,
        numberOfSourceSentencesInSystem: numberOfSourceSentencesInSystem,
        numberOfLanguagesInSystem: numberOfLanguagesInSystem
    });

    console.info(`Created fake data`);
}

main()
    .then(() => process.exit())
    .catch((err) => process.exit(err));
