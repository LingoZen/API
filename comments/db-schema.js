const Sequelize = require('sequelize');

const {dbConnection} = require('../db');
const {User} = require('../users/db-schema');
const {SourceSentence} = require('../source-sentences/db-schema');
const {Translation} = require('../translations/db-schema');

const Comment = dbConnection.define('comment', {
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
Comment.belongsTo(SourceSentence);
SourceSentence.hasMany(Comment);

Comment.belongsTo(Translation);
Translation.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports.Comment = Comment;
