const Sequelize = require('sequelize');

const {dbConnection} = require('../db');
const {User} = require('../users/db-schema');
const {Language} = require('../languages/db-schema');
const {SourceSentence} = require('../source-sentences/db-schema');

const Translation = dbConnection.define('translation', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    hooks: {}
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

module.exports.Translation = Translation;
