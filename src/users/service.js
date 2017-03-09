import assert from 'assert';

import {User} from './db-schema';

async function getUser(args) {
    assert(args);

    return User.findOne({where: args});
}

async function getUsers(args) {
    assert(args);

    return User.findAll({where: args});
}

async function create(args) {
    assert(args);

    return User.create(args);
}

async function update(args) {
    assert(args);
    assert(args.id);

    let id = args.id;
    delete args.id;

    await  User.update(args, {where: {id: id}, limit: 1});
    return getUser({id: id});
}

async function destroy(id) {
    assert(id);

    const user = getUser({id: id});
    if (!user) {
        throw newError(`User with id ${id} not found`);
    }

    await User.destroy({where: {id: id}});
    return user;
}

export const Service = {
    getUser: getUser,
    getUsers: getUsers,
    create: create,
    update: update,
    destroy: destroy
};