'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class STSWNCollection extends Model {
    static associate(models) {
      STSWNCollection.hasMany(models.STSWNCollectionDetail, {
        foreignKey: 'sampleId',
        as: 'details'
      });
    }
  }

  STSWNCollection.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    swnNo: { type: DataTypes.STRING, allowNull: false },
    style: { type: DataTypes.STRING },
    season: { type: DataTypes.STRING },
    buyer: { type: DataTypes.STRING },
    supplier: { type: DataTypes.STRING },
    createdBy: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'STSWNCollection',
    tableName: 'STSWNCollections',
    timestamps: false
  });

  return STSWNCollection;
};
