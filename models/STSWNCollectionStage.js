'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class STSWNCollectionStage extends Model {
        static associate(models) {
            STSWNCollectionStage.belongsTo(models.STSWNCollectionDetail, {
                foreignKey: 'detailId',
                as: 'detail'
            });
        }
    }

    STSWNCollectionStage.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        detailId: { type: DataTypes.INTEGER, allowNull: false },
        stageType: { type: DataTypes.STRING }, // 'Fabric', 'Cutting', 'Trim', 'Printing', 'Embroidery', 'Laser'
        inAt: { type: DataTypes.DATE },
        outAt: { type: DataTypes.DATE },
        inBy: { type: DataTypes.STRING },
        outBy: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING }, // 'Partial', 'Full'
        qtyOut: { type: DataTypes.INTEGER },
        note: { type: DataTypes.TEXT }
    }, {
        sequelize,
        modelName: 'STSWNCollectionStage',
        tableName: 'STSWNCollectionStages',
        timestamps: false
    });

    return STSWNCollectionStage;
};
