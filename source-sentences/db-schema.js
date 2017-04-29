import Sequelize from 'sequelize';
import assert from 'assert';

import {dbConnection} from '../db';
import {ElasticsearchService as SourceSentenceElasticsearchService} from './elasticsearch-service'
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
        afterCreate: (sourceSentence) => {
            assert(sourceSentence);

            return SourceSentenceElasticsearchService.indexSourceSentenceInElasticsearch(sourceSentence)
        },
        afterUpdate: (sourceSentence) => {
            assert(sourceSentence);

            return SourceSentenceElasticsearchService.indexSourceSentenceInElasticsearch(sourceSentence)
        },
        afterDestroy: (sourceSentence) => {
            assert(sourceSentence);

            return SourceSentenceElasticsearchService.destroySourceSentenceInElasticsearch(sourceSentence)
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
