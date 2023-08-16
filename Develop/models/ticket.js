const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const dayjs = require('dayjs')


class Ticket extends Model {}

Ticket.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0,250],
        },
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_editing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'todo',
        validate: {
            isIn: [['todo', 'doing', 'review', 'done']]
        }
    },
    creator_id: {
        type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
    },
    project_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
            references: {
                model: 'project',
                key: 'id',
            },
    },
},
{
    hooks: {
        beforeCreate: (ticket, options) => {
            const oneWeekFromNow = dayjs().add(1, 'week').startOf('day').toDate();
            ticket.due_date = oneWeekFromNow;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored:true,
    modelName: 'ticket',
    }

);

module.exports = Ticket;