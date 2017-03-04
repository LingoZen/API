const Faker = require("faker");

const {Reaction} = require("./db-schema");

module.exports.createFakeData = async function (options) {
    const numberOfReactionsToCreate = options.numberOfReactionsToCreate;
    const numberOfUsersInSystem = options.numberOfUsersInSystem;
    const numberOfSourceSentencesInSystem = options.numberOfSourceSentencesInSystem;
    const numberOfTranslationsInSystem = options.numberOfTranslationsInSystem;
    const numberOfCommentsInSystem = options.numberOfCommentsInSystem;

    await Reaction.sync({force: false});

    for (let _ = 0; _ < numberOfReactionsToCreate; _++) {
        let reaction = {
            type: (parseInt(Math.random() * 100) % 3) ? 'LIKE' : 'DISLIKE',
            userId: Faker.random.number({min: 1, max: numberOfUsersInSystem, precision: 1}),
        };

        switch (parseInt(Math.random() * 100) % 3) {
            case 0:
                reaction.sourceSentenceId = Faker.random.number({
                    min: 1,
                    max: numberOfSourceSentencesInSystem,
                    precision: 1
                });
                break;
            case 1:
                reaction.translationId = Faker.random.number({
                    min: 1,
                    max: numberOfTranslationsInSystem,
                    precision: 1
                });
                break;
            case 2:
                reaction.commentId = Faker.random.number({
                    min: 1,
                    max: numberOfCommentsInSystem,
                    precision: 1
                });
                break;
        }

        await Reaction.create(reaction);
    }

    return numberOfReactionsToCreate;
};
