'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class STSWNCollection extends Model {
    static associate(models) {

    }
  }

  STSWNCollection.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    swnNo: { type: DataTypes.STRING, allowNull: false },
    style: { type: DataTypes.STRING },
    season: { type: DataTypes.STRING },
    buyer: { type: DataTypes.STRING },
    supplier: { type: DataTypes.STRING },
    sampleType: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    sizeList: { type: DataTypes.STRING },
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
