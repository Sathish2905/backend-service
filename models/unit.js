const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path if needed


class Unit extends Model {}

Unit.init(
    {
        unit_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        unit_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'unit_types',
                key: 'unit_type_id',
            },
            onDelete: 'CASCADE',
        },
        unit_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        abbreviation: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        conversion_to_base: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Unit',
        tableName: 'units',
        timestamps: false,
    }
);

module.exports = Unit;
