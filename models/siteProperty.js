const { Model, DataTypes } = require('sequelize');

class SiteProperty extends Model {
    static init(sequelize) {
        return super.init(
            {
                property_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                property_key: {
                    type: DataTypes.STRING(50),
                    unique: true,
                    allowNull: false,
                },
                property_value: {
                    type: DataTypes.TEXT,
                },
                description: {
                    type: DataTypes.STRING(255),
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    onUpdate: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: 'SiteProperty',
                tableName: 'site_properties',
                timestamps: false,
            }
        );
    }
}

module.exports = SiteProperty;
