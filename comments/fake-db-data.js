const Faker = require("faker");

const {Comment} = require("./db-schema");

module.exports.createFakeData = async function (options) {
    const numberOfCommentsToCreate = options.numberOfCommentsToCreate;
    const numberOfTranslationsInSystem = options.numberOfTranslationsInSystem;
    const numberOfUsersInSystem = options.numberOfUsersInSystem;
    const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;

    await Comment.sync({force: false});

    for (let _ = 0; _ < numberOfCommentsToCreate; _++) {
        let comment = {
            text: Faker.lorem.sentence(),
            userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1})
        };

        switch (parseInt(Math.random() * 100) % 2) {
            case 0:
                comment.sourceSentenceId = Faker.random.number({
                    min: 1,
                    max: numberOfSourceSentencesInSystem,
                    precision: 1
                });
                break;
            case 1:
                comment.translationId = Faker.random.number({
                    min: 1,
                    max: numberOfTranslationsInSystem,
                    precision: 1
                });
                break;
        }

        await Comment.create(comment);
    }

    return numberOfCommentsToCreate;
};
