const {Language} = require('./db-schema');

async function getLanguage(args) {
    return Language.findOne({where: args});
}

async function getLanguages(args) {
    return Language.findAll({where: args});
}

async function create(args) {
    return Language.create(args);
}

async function update(args) {
    let id = args.id;
    delete args.id;

    await Language.update(args, {where: {id: id}, limit: 1});
    return getLanguage({id: id});
}

async function destroy(id) {
    const language = await getLanguage({id: id});
    if (!language) {
        throw new Error(`Language with id ${id} not found`);
    }

    await Language.destroy({where: {id: id}});
    return language;
}

module.exports.Service = {
    getLanguage: getLanguage,
    getLanguages: getLanguages,

    create: create,
    update: update,
    destroy: destroy
};
