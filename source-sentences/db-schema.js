import Sequelize from 'sequelize';

import {dbConnection} from '../db';
import {User} from '../users/db-schema';
// import {Translation} from '../translations/db-schema';
// import {Comment} from '../comments/db-schema';
// import {Reaction} from '../reactions/db-schema';
import {createFakeDate} from './fake-db-data';

export const SourceSentence = dbConnection.define('sourceSentence', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    hooks: {
        afterCreate: () => {
            //todo es river here
        },
        afterUpdate: () => {
            //todo es river here
        },
        afterDestroy: () => {
            //todo es river here
        }
    }
});

//relationships
SourceSentence.belongsTo(User);
// SourceSentence.hasMany(Translation);
// SourceSentence.hasMany(Comment);
// SourceSentence.hasMany(Reaction);

//create fake data
createFakeDate();
