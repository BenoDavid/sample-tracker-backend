'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class STSWNCollection extends Model {
    static associate(models) {
      STSWNCollection.hasMany(models.STSWNCollectionStage, { foreignKey: 'collectionId', sourceKey: 'id', as: 'stages' });
    }
  }

  STSWNCollection.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    swnNo: { type: DataTypes.STRING, allowNull: false },
    buyer: { type: DataTypes.STRING },
    season: { type: DataTypes.STRING },
    sampleType: { type: DataTypes.STRING },
    style: { type: DataTypes.STRING },
    supplier: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    buyerQty: { type: DataTypes.INTEGER },
    counterQty: { type: DataTypes.INTEGER },
    swnQty: { type: DataTypes.INTEGER },
    indentRemarks: { type: DataTypes.TEXT },
    myRequiredDate: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'STSWNCollection',
    tableName: 'STSWNCollections',
    timestamps: false
  });

  return STSWNCollection;
};
