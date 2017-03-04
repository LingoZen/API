const Faker = require('faker');

const {User} = require('./db-schema');

module.exports.createFakeData = async function (options) {
    const numberOfUsersToCreate = options.numberOfUsersToCreate;

    await User.sync({force: false});

    for (let _ = 0; _ < numberOfUsersToCreate; _++) {
        const user = {
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
            username: Faker.internet.userName(),
            password: Faker.internet.password()
        };

        await User.create(user);
    }

    return numberOfUsersToCreate;
};
