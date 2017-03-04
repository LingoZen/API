const {Reaction} = require('./db-schema');

async function getReaction(args) {
    return Reaction.findOne({where: args});
}

async function getReactions(args) {
    return Reaction.findAll({where: args});
}

async function create(args) {
    return Reaction.create(args);
}

async function update(args) {
    let id = args.id;
    delete args.id;

    await Reaction.update(args, {where: {id: id}, limit: 1});
    return getReaction({id: id});
}

async function destroy(id) {
    let reaction = getReaction({id: id});
    if (!reaction) {
        throw new Error(`Reaction with id ${id} not found`);
    }

    await Reaction.destroy({where: {id: id}});
    return reaction;
}

module.exports.Service = {
    getReaction: getReaction,
    getReactions: getReactions,

    create: create,
    update: update,
    destroy: destroy
};
