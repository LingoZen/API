import {Comment} from './db-schema';

function getComment(args) {
    return Comment.findOne({where: args});
}

function getComments(args) {
    return Comment.findAll({where: args});
}

function create(args) {
    return Comment.create(args);
}

function update(args) {
    let id = args.id;
    delete args.id;

    return new Promise((resolve, reject) => {
        return Comment.update(args, {where: {id: id}, limit: 1}).then(() => {
            return resolve(getComment({id: id}));
        }).catch((err) => {
            return reject(err);
        });
    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        getComment({id: id}).then((comment) => {
            if (!comment) {
                return reject(Error(`Comment with id ${id} not found`));
            }

            Comment.destroy({where: {id: id}}).then(() => {
                return resolve(comment);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

export const Service = {
    getComment: getComment,
    getComments: getComments,

    create: create,
    update: update,
    destroy: destroy
};
