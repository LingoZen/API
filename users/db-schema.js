const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

const {dbConnection} = require('../db');

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
            if (user.password) {
                user.password = encryptPassword(user.password);
            }

            return user;
        },
        beforeUpdate: (user) => {
            if (user.password) {
                user.password = encryptPassword(user.password);
            }

            return user;
        }
    }
});

function encryptPassword(plaintextPassword) {
    if (!plaintextPassword) {
        return plaintextPassword;
    }

    return bcrypt.hashSync(plaintextPassword);
}

/**
 * Relationships
 */

module.exports.User = User;
