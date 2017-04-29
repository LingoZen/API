import Sequelize from 'sequelize';
import assert from 'assert';

import {dbConnection} from '../db';
import {Service as UserService} from './service';

export const User = dbConnection.define('user', {
    name: {
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
        beforeCreate: async (user) => {
            assert(user);

            user.password = await UserService.encryptPassword(user.password);
            return user;
        },
        beforeUpdate: async (user) => {
            assert(user);

            user.password = await UserService.encryptPassword(user.password);
            return user;
        }
    }
});
