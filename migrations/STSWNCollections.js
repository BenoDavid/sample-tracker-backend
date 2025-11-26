'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCollections', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            swnNo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            buyer: {
                type: Sequelize.STRING
            },
            season: {
                type: Sequelize.STRING
            },
            sampleType: {
                type: Sequelize.STRING
            },
            style: {
                type: Sequelize.STRING
            },
            supplier: {
                type: Sequelize.STRING
            },
            color: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.STRING
            },
            buyerQty: {
                type: Sequelize.INTEGER
            },
            counterQty: {
                type: Sequelize.INTEGER
            },
            swnQty: {
                type: Sequelize.INTEGER
            },
            indentRemarks: {
                type: Sequelize.TEXT
            },
            myRequiredDate: {
                type: Sequelize.DATE
            },
            cutting: { type: Sequelize.INTEGER },
            embroidery: { type: Sequelize.INTEGER },
            fabric: { type: Sequelize.INTEGER },
            laser: { type: Sequelize.INTEGER },
            pattern: { type: Sequelize.INTEGER },
            printing: { type: Sequelize.INTEGER },
            stitching: { type: Sequelize.INTEGER },
            trim: { type: Sequelize.INTEGER },
            cutting: { type: Sequelize.INTEGER },
            fabricType: { type: Sequelize.STRING },
            stitchingSMV: { type: Sequelize.DOUBLE },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollections');
    }
};
