const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TicketComment extends Model {
    getFormattedDate() {
        return this.date_posted.toLocaleString();
    }
}

TicketComment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [0, 250]
            },
        },
        date_posted: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dismiss: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        creator_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        ticket_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ticket',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ticket_comment',
    }
);

module.exports = TicketComment;
