const Sequelize = require('sequelize');

const {dbConnection} = require('../db');
const SourceSentenceService = require('./service').Service;
const {User} = require('../users/db-schema');
const {Language} = require('../languages/db-schema');

const SourceSentence = dbConnection.define('sourceSentence', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    hooks: {
        afterCreate: (sourceSentence) => {
            return SourceSentenceService.indexSourceSentenceInElasticsearch(sourceSentence)
        },
        afterUpdate: (sourceSentence) => {
            return SourceSentenceService.indexSourceSentenceInElasticsearch(sourceSentence)
        },
        afterDestroy: (sourceSentence) => {
            return SourceSentenceService.destroySourceSentenceInElasticsearch(sourceSentence)
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

module.exports.SourceSentence = SourceSentence;
