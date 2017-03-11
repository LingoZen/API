import Sequelize from 'sequelize';

import {dbConnection} from '../../db';

export const Language = dbConnection.define('language', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
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
