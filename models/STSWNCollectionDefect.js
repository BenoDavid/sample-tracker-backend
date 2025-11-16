'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class STSWNCollectionDefect extends Model {
        static associate(models) {

        }
    }

    STSWNCollectionDefect.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        qtyId: { type: DataTypes.INTEGER, allowNull: false },
        defectType: { type: DataTypes.STRING, allowNull: false }, // 'Stitching QC', 'CFT QC', etc.
        description: { type: DataTypes.TEXT, allowNull: true },
        severity: { type: DataTypes.STRING, allowNull: true }, // e.g., 'Minor', 'Major', 'Critical'
        detectedBy: { type: DataTypes.STRING, allowNull: true },
        detectedAt: { type: DataTypes.DATE, allowNull: true }
    }, {
        sequelize,
        modelName: 'STSWNCollectionDefect',
        tableName: 'STSWNCollectionDefects',
        timestamps: false
    });

    return STSWNCollectionDefect;
};
