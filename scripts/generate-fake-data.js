import {createFakeData as createFakeLanguageData} from '../languages/fake-db-data'
import {createFakeData as createFakeUserData} from '../users/fake-db-data'
import {createFakeData as createFakeSourceSentenceData} from '../source-sentences/fake-db-data'
import {createFakeData as createFakeTranslationData} from '../translations/fake-db-data'
import {createFakeData as createFakeCommentData} from '../comments/fake-db-data'
import {createFakeData as createFakeReactionData} from '../reactions/fake-db-data'

//Replace this with all seeds
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
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
