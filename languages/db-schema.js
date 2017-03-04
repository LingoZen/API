const Sequelize = require('sequelize');

const {dbConnection} = require('../db');

const Language = dbConnection.define('language', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    englishName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
}, {
    timestamps: true,
    paranoid: true,
    hooks: {}
});

/**
 * Relationships
 */

module.exports.Language = Language;
