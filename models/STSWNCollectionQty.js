'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class STSWNCollectionQty extends Model {
        static associate(models) {
            STSWNCollectionQty.hasOne(models.STSWNCollection, { foreignKey: 'id', sourceKey: 'collectionId', as: 'collection' });
        }
    }

    STSWNCollectionQty.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        collectionId: { type: DataTypes.INTEGER, allowNull: false },
        serialNo: { type: DataTypes.STRING, allowNull: false },

        // Line and operator info
        line: { type: DataTypes.STRING },
        operator: { type: DataTypes.STRING },
        operatorAssignedBy: { type: DataTypes.STRING },
        lineInTime: { type: DataTypes.DATE },
        lineOutTime: { type: DataTypes.DATE },
        lostMinutes: { type: DataTypes.INTEGER },
        lostMinRemark: { type: DataTypes.TEXT },

        // Stitch process
        stitchOutTime: { type: DataTypes.INTEGER },
        stitchOutBy: { type: DataTypes.STRING },

        // QC process
        qcStatus: { type: DataTypes.STRING }, // e.g., 'Pending', 'Pass', 'Fail'
        qcBy: { type: DataTypes.STRING },
        qcNote: { type: DataTypes.TEXT },

        // CFT process
        cftOutTime: { type: DataTypes.DATE },
        cftStatus: { type: DataTypes.STRING },
        cftOutBy: { type: DataTypes.STRING },
        cftNote: { type: DataTypes.TEXT }

    }, {
        sequelize,
        modelName: 'STSWNCollectionQty',
        tableName: 'STSWNCollectionQtys',
        timestamps: false
    });

    return STSWNCollectionQty;
};
