import Sequelize from 'sequelize';

import {dbConnection} from '../db';
import {Service as SourceSentenceService} from './service';
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
        afterCreate: (sourceSentence, options, next) => {
            SourceSentenceService.indexSourceSentenceInElasticsearch(sourceSentence)
                .then(() => next())
                .catch((err) => next(err));
        },
        afterUpdate: (sourceSentence, options, next) => {
            SourceSentenceService.indexSourceSentenceInElasticsearch(sourceSentence)
                .then(() => next())
                .catch((err) => next(err));
        },
        afterDestroy: (sourceSentence, options, next) => {
            SourceSentenceService.destroySourceSentenceInElasticsearch(sourceSentence)
                .then(() => next())
                .catch((err) => next(err));
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
