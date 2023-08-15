const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collaborator extends Model {}
// Array for access levels
const accessOptions = ['client', 'admin'];


Collaborator.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        access_levels: {
            type: DataTypes.ENUM('client', 'admin'),
            allowNull: false,
            defaultValue: 'client', // Set a default value
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'project',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'collaborator',
    }
);

module.exports = Collaborator;