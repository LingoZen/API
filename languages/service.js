import {Language} from './db-schema';

function getLanguage(args) {
    return Language.findOne({where: args});
}

function getLanguages(args) {
    return Language.findAll({where: args});
}

function create(args) {
    return Language.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return Language.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getLanguage({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getLanguage({id: id}).then((language) => {
            if (!language) {
                return reject(Error(`Language with id ${id} not found`));
            }

            Language.destroy({where: {id: id}}).then(() => {
                return resolve(language);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

export const Service = {
    getLanguage: getLanguage,
    getLanguages: getLanguages,

    create: create,
    update: update,
    destroy: destroy
};
