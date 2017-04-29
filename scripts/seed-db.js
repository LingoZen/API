require('babel-polyfill');

const commentSeed = require('../comments/db-seed.json');
const languageSeed = require('../languages/db-seed.json');
const reactionSeed = require('../reactions/db-seed.json');
const sourceSentenceSeed = require('../source-sentences/db-seed.json');
const translationSeed = require('../translations/db-seed.json');
const userSeed = require('../users/db-seed.json');

const {User} = require('../users/db-schema');
const {Language} = require('../languages/db-schema');
const {SourceSentence} = require('../source-sentences/db-schema');
const {Translation} = require('../translations/db-schema');
const {Comment} = require('../comments/db-schema');
const {Reaction} = require('../reactions/db-schema');


async function main() {
    await dropAllTables();

    await createAllTables();

    await populateDatabase();

    console.info(`Created fake data`);
}

main()
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });

async function dropAllTables() {
    await Reaction.drop();
    await Comment.drop();
    await Translation.drop();
    await SourceSentence.drop();
    await Language.drop();
    await User.drop();
}

async function createAllTables() {
    await User.sync();
    await Language.sync();
    await SourceSentence.sync();
    await Translation.sync();
    await Comment.sync();
    await Reaction.sync();
}

async function populateDatabase() {
    for (let user of userSeed) {
        await User.create(user);
    }

    for (let language of languageSeed) {
        await Language.create(language);
    }

    for (let sourceSentence of sourceSentenceSeed) {
        await SourceSentence.create(sourceSentence);
    }

    for (let translation of translationSeed) {
        await Translation.create(translation);
    }

    for (let comment of commentSeed) {
        await Comment.create(comment);
    }

    for (let reaction of reactionSeed) {
        await Reaction.create(reaction);
    }
}
