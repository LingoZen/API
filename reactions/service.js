import {Reaction} from './db-schema';

function getReaction(args) {
    return Reaction.findOne({where: args});
}

function getReactions(args) {
    return Reaction.findAll({where: args});
}

function create(args) {
    return Reaction.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return Reaction.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getReaction({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getReaction({id: id}).then((reaction) => {
            if (!reaction) {
                return reject(Error(`Reaction with id ${id} not found`));
            }

            Reaction.destroy({where: {id: id}}).then(() => {
                return resolve(reaction);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

export const Service = {
    getReaction: getReaction,
    getReactions: getReactions,

    create: create,
    update: update,
    destroy: destroy
};
