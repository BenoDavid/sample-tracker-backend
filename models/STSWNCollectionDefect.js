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
        count: { type: DataTypes.INTEGER, allowNull: false },
        section: { type: DataTypes.STRING, allowNull: false },
        detectedBy: { type: DataTypes.STRING, allowNull: false },
        detectedAt: { type: DataTypes.DATE, allowNull: false }
    }, {
        sequelize,
        modelName: 'STSWNCollectionDefect',
        tableName: 'STSWNCollectionDefects',
        timestamps: false
    });

    return STSWNCollectionDefect;
};
