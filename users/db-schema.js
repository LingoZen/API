const Sequelize = require('sequelize');

const {dbConnection} = require('../db');
const UserService = require('./service').Service;

const User = dbConnection.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastLoginDate: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeCreate: (user) => {
            return UserService.encryptPassword(user);
        },
        beforeUpdate: (user) => {
            return UserService.encryptPassword(user);
        }
    }
});

/**
 * Relationships
 */

module.exports.User = User;
