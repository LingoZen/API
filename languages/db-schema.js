import Sequelize from 'sequelize';

import {dbConnection} from '../db';

export const Language = dbConnection.define('language', {
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
