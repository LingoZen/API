import {SourceSentence} from './db-schema';

function getSourceSentence(args) {
    return SourceSentence.findOne({where: args});
}

function getSourceSentences(args) {
    return SourceSentence.findAll({where: args});
}

function create(args) {
    return SourceSentence.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return SourceSentence.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getSourceSentence({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getSourceSentence({id: id}).then((user) => {
            if (!user) {
                return reject(Error(`Source sentence with id ${id} not found`));
            }

            SourceSentence.destroy({where: {id: id}}).then(() => {
                return resolve(user);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

export const Service = {
    getSourceSentence: getSourceSentence,
    getSourceSentences: getSourceSentences,
    create: create,
    update: update,
    destroy: destroy
};
