import bcrypt from 'bcrypt-nodejs';

import {User} from './db-schema';

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

function getUser(args) {
    return User.findOne({where: args});
}

function getUsers(args) {
    return User.findAll({where: args});
}

function create(args) {
    return User.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return User.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getUser({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getUser({id: id}).then((user) => {
            if (!user) {
                return reject(Error(`User with id ${id} not found`));
            }

            User.destroy({where: {id: id}}).then(() => {
                return resolve(user);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

export const Service = {
    getUser: getUser,
    getUsers: getUsers,
    create: create,
    update: update,
    destroy: destroy,

    encryptPassword: encryptPassword
};
