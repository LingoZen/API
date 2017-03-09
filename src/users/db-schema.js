import Sequelize from 'sequelize';
import bcrypt from 'bcrypt-nodejs';
import assert from 'assert';

import {dbConnection} from '../../db';

export const User = dbConnection.define('user', {
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
            assert(user);

            if (user.password) {
                user.password = encryptPassword(user.password);
            }

            return user;
        },
        beforeUpdate: (user) => {
            assert(user);

            if (user.password) {
                user.password = encryptPassword(user.password);
            }

            return user;
        }
    }
});

function encryptPassword(plaintextPassword) {
    assert(bcrypt);

    if (!plaintextPassword) {
        return plaintextPassword;
    }

    return bcrypt.hashSync(plaintextPassword);
}

/**
 * Relationships
 */
