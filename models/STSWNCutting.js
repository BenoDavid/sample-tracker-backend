'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class STSWNCutting extends Model {
        static associate(models) {
            STSWNCutting.hasOne(models.STSWNCollection, { foreignKey: 'id', sourceKey: 'collectionId', as: 'collection' });

        }
    }

    STSWNCutting.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        collectionId: { type: DataTypes.INTEGER, allowNull: false },
        inAt: { type: DataTypes.DATE },
        outAt: { type: DataTypes.DATE },
        outBy: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING },
        qty: { type: DataTypes.INTEGER },
        note: { type: DataTypes.TEXT },
    }, {
        sequelize,
        modelName: 'STSWNCutting',
        tableName: 'STSWNCuttings',
        timestamps: false
    });

    return STSWNCutting;
};
