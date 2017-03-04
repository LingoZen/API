const bcrypt = require('bcrypt-nodejs');

const {User} = require('./db-schema');

function encryptPassword(user) {
    if (!user) {
        return user;
    }

    if (!user.password) {
        return user;
    }

    user.password = bcrypt.hashSync(user.password);
    return user;
}

async function getUser(args) {
    return User.findOne({where: args});
}

async function getUsers(args) {
    return User.findAll({where: args});
}

async function create(args) {
    return User.create(args);
}

async function update(args) {
    let id = args.id;
    delete args.id;

    await  User.update(args, {where: {id: id}, limit: 1});
    return getUser({id: id});
}

async function destroy(id) {
    const user = getUser({id: id});
    if (!user) {
        throw newError(`User with id ${id} not found`);
    }

    await User.destroy({where: {id: id}});
    return user;
}

module.exports.Service = {
    getUser: getUser,
    getUsers: getUsers,
    create: create,
    update: update,
    destroy: destroy,

    encryptPassword: encryptPassword
};
