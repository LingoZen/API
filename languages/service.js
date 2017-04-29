import assert from 'assert';

import {Language} from './db-schema';
import {AppError} from "../utils/app-error";

async function getLanguage(args) {
    assert(args);

    return Language.findOne({where: args});
}

async function getLanguages(args) {
    assert(args);

    return Language.findAll({where: args});
}

async function create(args) {
    assert(args);

    return Language.create(args);
}

async function update(args) {
    assert(args);
    assert(args.id);

    let id = args.id;
    delete args.id;

    await Language.update(args, {where: {id: id}, limit: 1});
    return getLanguage({id: id});
}

async function destroy(id) {
    assert(id);

    const language = await getLanguage({id: id});
    if (!language) {
        throw new AppError(`Language with id ${id} not found`, {code: `LANGUAGE_NOT_FOUND`});
    }

    await Language.destroy({where: {id: id}});
    return language;
}

export const Service = {
    getLanguage: getLanguage,
    getLanguages: getLanguages,

    create: create,
    update: update,
    destroy: destroy
};
