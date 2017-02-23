import Sequelize from 'sequelize';

import {dbConnection} from '../db';
import {Service as UserService} from './service';
// import {Comment} from '../comments/db-schema';
// import {Reaction} from '../reactions/db-schema';
import {createFakeDate} from './fake-db-data';

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
            UserService.encryptPassword(user);
        },
        beforeUpdate: (user) => {
            UserService.encryptPassword(user);
        }
    }
});

//relationships
// User.hasMany(Comment);
// User.hasMany(Reaction);

//create fake data
createFakeDate();
