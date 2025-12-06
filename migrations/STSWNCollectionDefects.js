'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCollectionDefects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            qtyId: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            defectType: {
                type: Sequelize.STRING,
                allowNull: false // e.g., 'Stitching QC', 'CFT QC'
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            section: {
                type: Sequelize.STRING,
                allowNull: false
            },
            detectedBy: {
                type: Sequelize.STRING,
                allowNull: false
            },
            detectedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollectionDefects');
    }
};
