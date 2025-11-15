'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class STSWNCollectionDetail extends Model {
    static associate(models) {
      STSWNCollectionDetail.belongsTo(models.STSWNCollection, {
        foreignKey: 'sampleId',
        as: 'sample'
      });
      STSWNCollectionDetail.hasMany(models.STSWNCollectionQty, {
        foreignKey: 'detailId',
        as: 'quantities'
      });
    }
  }

  STSWNCollectionDetail.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sampleId: { type: DataTypes.INTEGER, allowNull: false },
    sampleType: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    sizeList: { type: DataTypes.STRING },
    indentRemarks: { type: DataTypes.TEXT },
    myRequiredDate: { type: DataTypes.DATE }
  }, {
    sequelize,
    modelName: 'STSWNCollectionDetail',
    tableName: 'STSWNCollectionDetails',
    timestamps: false
  });

  return STSWNCollectionDetail;
};
