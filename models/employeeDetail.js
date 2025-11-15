'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employeeDetail.init({
    Employee_Code: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    Employee_Name: DataTypes.STRING,
 
  }, {
    sequelize,
    modelName: 'employeeDetail',
    tableName: 'EmployeeDetailsHCM',
    timestamps: false
  });
  return employeeDetail;
};
 