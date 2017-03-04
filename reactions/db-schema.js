const Sequelize = require('sequelize');

const {dbConnection} = require('../db');
const {User} = require('../users/db-schema');
const {Translation} = require('../translations/db-schema');
const {Comment} = require('../comments/db-schema');
const {SourceSentence} = require('../source-sentences/db-schema');

const Reaction = dbConnection.define('reaction', {
    type: {
        type: Sequelize.ENUM('LIKE', 'DISLIKE'),
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
Reaction.belongsTo(SourceSentence);
SourceSentence.hasMany(Reaction);

Reaction.belongsTo(Translation);
Translation.hasMany(Reaction);

Reaction.belongsTo(User);
User.hasMany(Reaction);

Reaction.belongsTo(Comment);
Comment.hasMany(Reaction);

module.exports.Reaction = Reaction;
