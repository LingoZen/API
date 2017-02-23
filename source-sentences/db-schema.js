import Sequelize from 'sequelize';

import {dbConnection} from '../db';
import {User} from '../users/db-schema';
import {Language} from '../languages/db-schema';

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

/**
 * Relationships
 */
SourceSentence.belongsTo(User);
User.hasMany(SourceSentence);

SourceSentence.belongsTo(Language);
Language.hasMany(SourceSentence);
