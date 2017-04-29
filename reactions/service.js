import assert from 'assert';

import {Reaction} from './db-schema';

async function getReaction(args) {
    assert(args);

    return Reaction.findOne({where: args});
}

async function getReactions(args) {
    assert(args);

    return Reaction.findAll({where: args});
}

async function create(args) {
    assert(args);

    return Reaction.create(args);
}

async function update(args) {
    assert(args);
    assert(args.id);

    let id = args.id;
    delete args.id;

    await Reaction.update(args, {where: {id: id}, limit: 1});
    return getReaction({id: id});
}

async function destroy(id) {
    assert(id);

    let reaction = getReaction({id: id});
    if (!reaction) {
        throw new Error(`Reaction with id ${id} not found`);
    }

    await Reaction.destroy({where: {id: id}});
    return reaction;
}

export const Service = {
    getReaction: getReaction,
    getReactions: getReactions,

    create: create,
    update: update,
    destroy: destroy
};
