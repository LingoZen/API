import Sequelize from 'sequelize';

import {dbConnection} from '../../db';
import {User} from '../users/db-schema';
import {Translation} from '../translations/db-schema';
import {Comment} from '../comments/db-schema';
import {SourceSentence} from '../source-sentences/db-schema';

export const Reaction = dbConnection.define('reaction', {
    type: {
        type: Sequelize.ENUM('LIKE', 'DISLIKE'),
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
Reaction.belongsTo(SourceSentence);
SourceSentence.hasMany(Reaction);

Reaction.belongsTo(Translation);
Translation.hasMany(Reaction);

Reaction.belongsTo(User);
User.hasMany(Reaction);

Reaction.belongsTo(Comment);
Comment.hasMany(Reaction);
