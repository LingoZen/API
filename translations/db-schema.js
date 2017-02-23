import Sequelize from 'sequelize';

import {dbConnection} from '../db';
import {User} from '../users/db-schema';
import {Language} from '../languages/db-schema';
import {SourceSentence} from '../source-sentences/db-schema';

export const Translation = dbConnection.define('translation', {
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
Translation.belongsTo(User);
User.hasMany(Translation);

Translation.belongsTo(SourceSentence);
SourceSentence.hasMany(Translation);

Translation.belongsTo(Language);
Language.hasMany(Translation);
