import assert from 'assert';

import {Translation} from './db-schema';

async function getTranslation(args) {
    assert(args);

    return Translation.findOne({where: args});
}

async function getTranslations(args) {
    assert(args);

    return Translation.findAll({where: args});
}

async function create(args) {
    assert(args);

    return Translation.create(args);
}

async function update(args) {
    assert(args);
    assert(args.id);

    let id = args.id;
    delete args.id;

    await Translation.update(args, {where: {id: id}, limit: 1});
    return getTranslation({id: id});
}

async function destroy(id) {
    assert(id);

    const translation = getTranslation({id: id});
    if (!translation) {
        throw new Error(`Translation with id ${id} not found`);
    }

    await Translation.destroy({where: {id: id}});
    return translation;
}

export const Service = {
    getTranslation: getTranslation,
    getTranslations: getTranslations,

    create: create,
    update: update,
    destroy: destroy
};
