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
                references: {
                    model: 'STSWNCollectionQtys',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            defectType: {
                type: Sequelize.STRING,
                allowNull: false // e.g., 'Stitching QC', 'CFT QC'
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            severity: {
                type: Sequelize.STRING,
                allowNull: true // 'Minor', 'Major', 'Critical'
            },
            detectedBy: {
                type: Sequelize.STRING,
                allowNull: true
            },
            detectedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollectionDefects');
    }
};
