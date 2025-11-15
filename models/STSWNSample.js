'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class STSWNSample extends Model {
        static associate(models) {
            // Define associations here if needed later
        }
    }

    STSWNSample.init({
        swnNo: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
        buyer: { type: DataTypes.STRING },
        season: { type: DataTypes.STRING },
        sampleType: { type: DataTypes.STRING },
        style: { type: DataTypes.STRING },
        supplier: { type: DataTypes.STRING },
        color: { type: DataTypes.STRING },
        sizeList: { type: DataTypes.STRING },
        buyerQty: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
        counterQty: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
        swnQty: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
        indentRemarks: { type: DataTypes.TEXT },
        myRequiredDate: { type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'STSWNSample',
        tableName: 'cfaiRFTinspectiontempmaster_24_6_2025',
        timestamps: false,
    });

    return STSWNSample;
};
