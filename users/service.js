import assert from "assert";
import bcrypt from "bcrypt-nodejs";

import {AppError} from "../utils/app-error";
import {User} from "./db-schema";

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

    const user = await getUser({id: id});
    if (!user) {
        throw new AppError(`User with id ${id} not found`, {code: `USER_NOT_FOUND`});
    }

    await User.destroy({where: {id: id}});
    return user;
}

async function login(username, password) {
    assert(username);
    assert(password);

    const user = await getUser({username: username});
    if (!user) {
        throw new AppError(`User with username ${username} not found`, {code: `USERNAME_NOT_FOUND`});
    }

    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError(`Password does not match`, {code: `INCORRECT_PASSWORD`});
    }
}

async function register(args) {
    assert(args);
    assert(args.username);
    assert(args.password);
    assert(args.email);

    // make sure email is unique
    let existingUser = await getUser({email: args.email});
    if (existingUser) {
        throw new AppError(`Email ${args.email} is already used`, {code: `EMAIL_NOT_UNIQUE`});
    }

    // make sure username is unique
    //todo: can we merge this get with above?
    existingUser = await getUser({username: args.username});
    if (existingUser) {
        throw new AppError(`Username ${args.username} is already used`, {code: `USERNAME_NOT_UNIQUE`});
    }

    // make sure password is strong enough
    const passwordIsStrong = await isPasswordStrong(args.password);
    if (!passwordIsStrong) {
        throw new AppError(`Password is not strong`, {code: `PASSWORD_NOT_SECURE`});
    }

    //validate email format
    const emailFormatIsGood = await isEmailFormatIsGood(args.email);
    if (!emailFormatIsGood) {
        throw new AppError(`Email format is bad`, {code: `BAD_EMAIL_FORMAT`});
    }

    // at this point, username and email is unique, and password is strong and encrypted.
    // if we wanted to validate any other properties then we would do that here, but we don't have any validation at the moment

    return User.create(args);
}

async function encryptPassword(plaintextPassword) {
    // use the brcypt.js library to encrypt the password
    return bcrypt.hashSync(plaintextPassword);
}

async function checkPassword(plaintextPassword, encryptedPassword) {
    return bcrypt.compareSync(plaintextPassword, encryptedPassword);
}

//todo: find password policies that are secure and not annoying to users
async function isPasswordStrong(plaintextPassword) {
    return true;
}

//todo: find email regex
async function isEmailFormatIsGood(email) {
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
