import {Translation} from './db-schema';

function getTranslation(args) {
    return Translation.findOne({where: args});
}

function getTranslations(args) {
    return Translation.findAll({where: args});
}

function create(args) {
    return Translation.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return Translation.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getTranslation({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getTranslation({id: id}).then((translation) => {
            if (!translation) {
                return reject(Error(`Translation with id ${id} not found`));
            }

            Translation.destroy({where: {id: id}}).then(() => {
                return resolve(translation);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

export const Service = {
    getTranslation: getTranslation,
    getTranslations: getTranslations,

    create: create,
    update: update,
    destroy: destroy
};
