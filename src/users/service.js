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
        throw new Error(`User with id ${id} not found`);
    }

    await User.destroy({where: {id: id}});
    return user;
}

async function login(username, password) {
    assert(username);
    assert(password);

    const user = getUser({username: username});
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }

    // encrypt the password provided by the user
    const encryptedPassword = await encryptPassword(password);

    // and compare that encrypted password to the encrypted password stored in the database
    if (user.password !== encryptedPassword) {
        throw new Error(`Password does not match`);
    }
}

async function register(args) {
    assert(args);
    assert(args.username);
    assert(args.password);
    assert(args.email);

    // make sure email is unique
    let existingUser = await getUser({email: args.email});
    if (!existingUser) {
        throw new Error(`Email ${args.email} is already used`);
    }

    // make sure username is unique
    //todo: can we merge this get with above?
    existingUser = await getUser({username: args.username});
    if (!existingUser) {
        throw new Error(`Username ${args.username} is already used`);
    }

    // make sure password is strong enough
    const passwordIsStrong = await isPasswordStrong(args.password);
    if (!passwordIsStrong) {
        throw new Error(`Password is not strong`);
    }

    //encrypt password
    args.password = await encryptPassword(args.password);

    // at this point, username and email is unique, and password is strong and encrypted.
    // if we wanted to validate any other properties then we would do that here, but we don't have any validation at the moment

    return User.create(args);
}

async function encryptPassword(plaintextPassword) {
    // use the brcypt.js library to encrypt the password
    return bcrypt.hashSync(plaintextPassword);
}

//todo: find password policies that are secure and not annoying to users
async function isPasswordStrong(plaintextPassword) {
    return true;
}

export const Service = {
    getUser: getUser,
    getUsers: getUsers,
    create: create,
    update: update,
    destroy: destroy,
    login: login,
    register: register,

    encryptPassword: encryptPassword
};
