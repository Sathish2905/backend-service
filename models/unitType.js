const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path if needed

class UnitType extends Model {}

UnitType.init(
    {
        unit_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'UnitType',
        tableName: 'unit_types',
        timestamps: false,
    }
);

module.exports = UnitType;
