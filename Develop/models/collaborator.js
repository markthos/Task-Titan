const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collaborator extends Model {}


Collaborator.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        access_level: {
            type: DataTypes.ENUM('client', 'worker', 'admin'),
            allowNull: false,
            defaultValue: 'client',
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'collaborator',
    },
    
);

module.exports = Collaborator;

/*
READABLE SQL QUERY

SELECT
    c.id,
    u.email AS user_email,
    p.name AS project_name,
    c.access_level
FROM
    collaborator c
JOIN
    user u ON c.user_id = u.id
JOIN
    project p ON c.project_id = p.id;

*/