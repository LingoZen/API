import Sequelize from 'sequelize';

import {dbConnection} from '../../db';
import {User} from '../users/db-schema';
import {SourceSentence} from '../source-sentences/db-schema';
import {Translation} from '../translations/db-schema';

export const Comment = dbConnection.define('comment', {
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
