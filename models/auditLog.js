const { Model, DataTypes } = require('sequelize');

class AuditLog extends Model {
    static init(sequelize) {
        return super.init(
            {
                log_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                property_key: {
                    type: DataTypes.STRING(50),
                },
                old_value: {
                    type: DataTypes.TEXT,
                },
                new_value: {
                    type: DataTypes.TEXT,
                },
                changed_by: {
                    type: DataTypes.STRING(50),
                },
                changed_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: 'AuditLog',
                tableName: 'audit_log',
                timestamps: false,
            }
        );
    }
}

module.exports = AuditLog;
